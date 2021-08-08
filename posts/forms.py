from django import forms
from django.db.models import fields
from .models import Content

class ContentForm(forms.ModelForm):
    class Meta:
        model = Content
        fields = ['title', 'body']
        widgets = {
            'title': forms.TextInput(attrs={
                'class' : 'form-title',
                'placeholder' : '제목'
            }),
            'body' : forms.Textarea(attrs={
                'class': 'form-body',
                'placeholder': '오늘의 이야기를 들려주세요.'
            })
        }
        labels = {
            'title': "",
            'body': ""
        }