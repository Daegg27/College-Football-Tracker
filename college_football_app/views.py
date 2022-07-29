from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

# Create your views here.

def send_the_homepage(request):
    print('home!')
    the_index = open('static/index.html').read()
    return HttpResponse(the_index)
