from inspect import Parameter
from pydoc import resolve
from time import time
from tracemalloc import start
from unicodedata import category
from xxlimited import new
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from .models import AppUser as User
from .models import ClassicGame
from dotenv import load_dotenv
import os
import json
import requests as HTTP_Client 
from datetime import datetime
import dateutil
import dateutil.parser
from django.forms.models import model_to_dict
import pprint


pp = pprint.PrettyPrinter(indent=4)


load_dotenv()
# Create your views here.

def send_the_homepage(request):
    print('home!')
    the_index = open('static/index.html').read()
    return HttpResponse(the_index)


@api_view(['POST'])
def sign_up(request):
    try:
        User.objects.create_user(username=request.data['email'], password=request.data['password'], email=request.data['email'])
    except Exception as e:
        print(str(e))
    return HttpResponse('hi')

@api_view(['POST'])
def log_in(request):
    print(dir(request))
    print(dir(request._request))

    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    # user = authenticate(username=email, password=password, email=email)
    user = authenticate(username=email, password=password)
    print('user?')
    print(user.email)
    print(user.password)
    if user is not None:
        if user.is_active:
            try:
                # access the base request, not the DRF request
                # this starts a login session for this user
                login(request._request, user)
            except Exception as e:
                print('except')
                print(str(e))
            return HttpResponse('success!')
            # Redirect to a success page.
        else:
            return HttpResponse('not active!')
            # Return a 'disabled account' error message
    else:
        return HttpResponse('no user!')
        # Return an 'invalid login' error message.


@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'success':True})




@api_view(['GET'])
def who_am_i(request):
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username'])

        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})

@api_view(['POST'])
def find_team(request):
    
    year = request.data['year']
    team = request.data['team']

    url = f'https://api.collegefootballdata.com/games?year={year}&team={team}' # This is the inital call to grab the schedule 

    headers = {
        "Authorization": f"Bearer {os.environ['token']}"
    }

    all_games = []

    response = HTTP_Client.get(url, headers=headers)
    jsonResponse = response.json()

    for game in jsonResponse:
        all_games.append(game)

    second_url = f'https://api.collegefootballdata.com/records?year={year}&team={team}' # This call is made to retrieve the record 
    second_response = HTTP_Client.get(second_url, headers=headers)
    new_response = second_response.json()
    wins = new_response[0]['total']['wins']
    losses = new_response[0]['total']['losses']


    return JsonResponse({'success': True, 'list_of_games': all_games, 'team':team, 'wins': wins, 'losses':losses})

@api_view(['POST'])
def fetch_information(request, gameID):
    
    year = request.data['year']
    venue_id = request.data['venue_id']
    game_id = request.data['gameID']
    away_team = request.data['away_team']
    home_team = request.data['home_team']
    start_date = request.data['start_time']

    url = f'https://api.collegefootballdata.com/teams/fbs?year={year}' # Searches all FBS teams by year

    headers = {
        "Authorization": f"Bearer {os.environ['token']}"
    }

    my_data = {}

    response = HTTP_Client.get(url, headers=headers)
    jsonResponse = response.json()

    for team in jsonResponse:
        if team['school'] == away_team:
            my_data['away_team_image'] = team['logos'][0]
            my_data['away_mascot'] = team['mascot']
        if team['school'] == home_team:
            my_data['home_team_image'] = team['logos'][0]
            my_data['home_mascot'] = team['mascot']

    second_url = f'https://api.collegefootballdata.com/games/teams?year={year}&gameId={game_id}' # Searches by gameID for status of corresponding game

    response = HTTP_Client.get(second_url, headers=headers)
    jsonResponse = response.json()
    # print(jsonResponse[0]['teams'][1])
    for data_set in jsonResponse[0]['teams']:
        if data_set['school'] == away_team:
            away_team_statholder = data_set
        else:
            home_team_statholder = data_set
    
    # print('this is the AWAY TEAM', away_team_statholder)
    # print('\n-------HOME TEAM------\n', home_team_statholder)

    for stats in away_team_statholder['stats']:
        if stats['category'] == 'netPassingYards':
            my_data['away_passing_yards'] = stats['stat']
        if stats['category'] == 'rushingYards':
            my_data['away_rushing_yards'] = stats['stat']
        if stats['category'] == 'turnovers':
            my_data['away_turnovers'] = stats['stat']
        if stats['category'] == 'qbHurries':
            my_data['away_qb_hurries'] = stats['stat']
        if stats['category'] == 'sacks':
            my_data['away_sacks'] = stats['stat']
        if stats['category'] == 'possessionTime':
            my_data['away_time_of_possession'] = stats['stat']

    for stats in home_team_statholder['stats']:
        if stats['category'] == 'netPassingYards':
            my_data['home_passing_yards'] = stats['stat']
        if stats['category'] == 'rushingYards':
            my_data['home_rushing_yards'] = stats['stat']
        if stats['category'] == 'turnovers':
            my_data['home_turnovers'] = stats['stat']
        if stats['category'] == 'qbHurries':
            my_data['home_qb_hurries'] = stats['stat']
        if stats['category'] == 'sacks':
            my_data['home_sacks'] = stats['stat']
        if stats['category'] == 'possessionTime':
            my_data['home_time_of_possession'] = stats['stat']
            
    third_url = 'https://api.collegefootballdata.com/venues' # Retrieves all information for stadiums
    response = HTTP_Client.get(third_url, headers=headers)
    jsonResponse = response.json()

    for stadium in jsonResponse:
        if stadium['id'] == venue_id: # Checks if the ID matches the venue ID in the game
            my_data['stadium_name'] = stadium['name']
            stadium_zip_code = stadium['zip']
            latitude = stadium['location']['y']
            longitude = stadium['location']['x']
            time_zone = stadium['timezone']

    dt = dateutil.parser.parse(start_date)
    dt_conversion = dt.astimezone(dateutil.tz.gettz(time_zone)) # Converts to the proper time zone
   
    print(dt_conversion)
    time_array = str(dt_conversion).split() # Seperates the date from the time
    
    day_of_game = time_array[0]
    start_time = time_array[1].split('-')[0]
    # print(f'The game was played on {day_of_game} at {start_time} at {my_data["stadium_name"]}')
    
    if start_time[3] != 0: # Grabs the time from the bottom of the hour for the weather API 
        split_time = start_time.split(':')
        split_time[1] = '00'
        split_time.pop() # Removes the seconds from the game time 
        start_time = ':'.join(split_time)
        print(split_time)
    else: # Pulls the seconds off the time regardless
        split_time = start_time.split(':')
        split_time.pop()
        start_time = ':'.join(split_time)
        print(split_time)
        
    print(start_time)

    fourth_url = 'http://api.weatherapi.com/v1/history.json' # Grabs the forecast data from the day of the game 
    response = HTTP_Client.get(fourth_url, params={
        'key': os.environ['key'],
        'q': stadium_zip_code,
        'dt': day_of_game
    })
    jsonResponse = response.json()
    # print(jsonResponse['forecast']['forecastday'][0]['hour'])

    for hour in jsonResponse['forecast']['forecastday'][0]['hour']:
        check_time = hour['time'].split()
        if check_time[1] == start_time:
            my_data['weather_condition'] = hour['condition']['text']
            my_data['temperature'] = round(hour['temp_f'])
            my_data['wind_speed'] = round(hour['wind_mph'])
            my_data['humidity'] = hour['humidity']
            my_data['local_time'] = start_time
            # print(hour)

    print(my_data)
 
    return JsonResponse(my_data)

@api_view(['PUT'])
def save_game(request, gameID):
    
    home_team = request.data['home_team']
    away_team = request.data['away_team']
    user_email = request.data['email']
    year = request.data['year']

    registered_user = User.objects.get(username = user_email)
    
    new_classic_game = ClassicGame(user=registered_user, game_id = gameID, home_team = home_team, away_team = away_team, year = year)
    new_classic_game.save()

    return JsonResponse({'Success': True})

@api_view(['GET'])
def find_saved_games(request):
    
    if request.GET.get('email'):
        user_email = request.GET['email']
        user = User.objects.get(email = user_email)
        
        query_set = ClassicGame.objects.filter(user = user)
        classic_games = []

        for game in query_set:
            new_game = model_to_dict(game)
            classic_games.append(new_game)


        return JsonResponse({'classic_games': classic_games})
    else:
        return JsonResponse({'Success': False})

    
    