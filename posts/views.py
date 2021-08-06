from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from requests.api import get
from .models import Content
from .forms import ContentForm
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy
from django.conf import settings

# Create your views here.

def user_listview(request):
    return render(request, 'user-listview.html')

def home(request):
    # 오늘 날짜 포스트만 불러오기
    posts = Content.objects.filter(pub_date__date=timezone.datetime.today())
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


def detail(request, index):
    post = get_object_or_404(Content, pk=index)
    return render(request, 'detail.html', {'post':post})

def edit(request, index):
    post = get_object_or_404(Content, pk=index)
    if request.method == "POST":
        form = ContentForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now
            post.save()
            return redirect('detail', index=post.pk)
    else:
        form = ContentForm(instance=post)
    return render(request, 'edit.html', {'form':form})

def delete(request, pk):
    post = get_object_or_404(Content, pk=pk)
    post.delete()
    return redirect('home')
