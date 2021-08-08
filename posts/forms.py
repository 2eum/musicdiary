from django import forms
from django.db.models import fields
from .models import Content

class ContentForm(forms.ModelForm):
    class Meta:
        model = Content
        fields = ['title', 'body']