from django.contrib.auth.forms import UserCreationForm
from django.db import models
from .models import CustomUser

class SignupForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username','password1','password2','nickname','user_email']