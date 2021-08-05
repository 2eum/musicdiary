from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

# Create your models here.

class Content(models.Model):
    title = models.CharField(max_length=150)
    music_title = models.CharField(max_length=150)
    writer = models.CharField(max_length=100)
    pub_date = models.DateTimeField(default=timezone.now)
    body = models.TextField(default='')