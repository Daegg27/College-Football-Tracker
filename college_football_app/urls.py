from django.urls import path
from . import views


urlpatterns = [
   path('', views.send_the_homepage),
   path('signup/', views.sign_up)
]