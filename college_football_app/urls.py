from django.urls import path
from . import views


urlpatterns = [
   path('', views.send_the_homepage),
   path('signup/', views.sign_up),
   path('login/', views.log_in),
   path('logout/', views.log_out),
   path('whoami', views.who_am_i),
   path('search_for_team/', views.find_team),
   path('search_for_team/<int:gameID>', views.fetch_information),
   path('search_for_team/<int:gameID>/save', views.save_game),
   path('saved_games', views.find_saved_games)
]