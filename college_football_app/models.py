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
    game_id = models.CharField(max_length=25)
    home_team = models.CharField(max_length=100)
    away_team = models.CharField(max_length=100)
    year = models.CharField(max_length=4)
    class Meta:
        # TODO: Use UniqueConstraint with constraints option instead
        # See: https://docs.djangoproject.com/en/4.0/ref/models/options/#unique-together
        unique_together = (("user", "game_id"))