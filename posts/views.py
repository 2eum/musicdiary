from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Content
from .forms import ContentForm
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy
from django.conf import settings

# Create your views here.

def user_listview(request):
    return render(request, 'user-listview.html')

def home(request):
    posts = Content.objects.all()
    return render(request,'home.html',{'posts_list':posts})

def new(request):
    
    track_title = request.POST.get('track_title')
    track_artist = request.POST.get('track_artist')
    track_album_cover = request.POST.get('track_album_cover')
    track_audio = request.POST.get('track_audio')

    if request.method == 'POST':
        form = ContentForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.track_title = track_title
            post.track_artist = track_artist
            post.track_album_cover = track_album_cover
            post.track_audio = track_audio
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('home')
    else:
        form = ContentForm()

    return render(request, 'new.html', {'form': form, 'track_title':track_title, 'track_artist':track_artist, 'track_album_cover':track_album_cover, 'track_audio':track_audio})    

def search_home(request):
    return render(request, 'search_home.html')

def search_query(request):
    CLIENT_ID = getattr(settings, 'CLIENT_ID', None)
    CLIENT_SECRET = getattr(settings, 'CLIENT_SECRET', None)
    client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    search_word = request.POST.get('search-word')
    results = sp.search(search_word)
    return render(request, 'search_home.html', {'results':results})

def detail(request):
    return render(request, 'detail.html')