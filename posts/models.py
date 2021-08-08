from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

# Create your models here.

class Content(models.Model):
    title = models.CharField(max_length=150)
    writer = models.CharField(max_length=100)
    pub_date = models.DateTimeField(default=timezone.now)
    body = models.TextField(default='')
    track_title = models.CharField(max_length=500)
    track_artist = models.CharField(max_length=500)
    track_album_cover = models.CharField(max_length=500)
    track_audio = models.CharField(max_length=500)
    

    #calendar
    # is_published = models.BooleanField(default=True)
    # def to_json(self):
    #     return {
    #         "album_cover" : self.track_album_cover,
    #         "pub_date" : self.pub_date
    #     }