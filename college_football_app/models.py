from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    favorite_team = models.CharField(max_length=100, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.

class ClassicGame(models.Model):

    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    stadium_name = models.CharField(max_length=100, null=True)
    weather_at_kickoff = models.CharField(max_length=50, null=True)
    home_team = models.CharField(max_length=100)
    home_team_score = models.IntegerField()
    away_team = models.CharField(max_length=100)
    away_team_score = models.IntegerField()
    winning_team = models.CharField(max_length=100)