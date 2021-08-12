from logging import error
from django.http.response import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from requests.api import get
from .models import Content
from .forms import ContentForm
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy, json #calendar
from django.conf import settings
from accounts.models import CustomUser
import json
from django.http import JsonResponse
from django.contrib import messages
from django.shortcuts import render

# Create your views here.

def home(request):
    # 오늘 날짜 포스트만 불러오기
    posts = Content.objects.filter(pub_date__date=timezone.datetime.today()).order_by('-pub_date')
    return render(request,'home.html',{'posts_list':posts})

def tutorial(request):
    return render(request,'tutorial.html')

def new(request):
    if request.user.is_authenticated:

        track_title = request.POST.get('track_title')
        track_artist = request.POST.get('track_artist')
        track_album_cover = request.POST.get('track_album_cover')
        track_audio = request.POST.get('track_audio')

        if request.method == 'POST': #저장
            form = ContentForm(request.POST, request.FILES)
            if form.is_valid():
                if track_title == "": # 제목O, 본문O, 음악X
                    messages.warning(request, "음악을 선곡해주세요.")
                    return render(request, 'new.html', {'form2': form})
                else: # 제목O, 본문O, 음악O
                    post = form.save(commit=False)
                    post.track_title = track_title
                    post.track_artist = track_artist
                    post.track_album_cover = track_album_cover
                    post.track_audio = track_audio
                    post.writer = request.user.nickname
                    post.writerid = request.user.username
                    post.author = request.user
                    post.published_date = timezone.now()
                    post.save()
                    return redirect('home')
            else:
                if track_title == "": # 제목 or 본문 중 하나 이상 없고 음악도 없음
                    messages.warning(request, "제목과 본문을 모두 쓰고 음악도 선곡해주세요.")
                    return render(request, 'new.html', {'form2': form})
                else: # 제목 or 본문 중 하나 이상 없고 음악은 있음
                    messages.warning(request, "제목과 본문을 모두 써주세요.")
                    return render(request, 'new.html', {'form2': form, 'track_title':track_title, 'track_artist':track_artist, 'track_album_cover':track_album_cover, 'track_audio':track_audio})

        else: #글쓰기
            form = ContentForm()
    else:
        return redirect('login')

    return render(request, 'new.html', {'form': form, 'track_title':track_title, 'track_artist':track_artist, 'track_album_cover':track_album_cover, 'track_audio':track_audio})    

def search_home(request):
    return render(request, 'search_home.html')

def search_query(request):
    CLIENT_ID = getattr(settings, 'CLIENT_ID', None)
    CLIENT_SECRET = getattr(settings, 'CLIENT_SECRET', None)
    client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # request가 ajax를 통해서 이뤄질 때만 작동
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        search_word = json.load(request)['search-word']
        results = sp.search(search_word)
        return JsonResponse(results)
    # TO-DO: 비정상 접근일 때 오류처리
    else:
        return JsonResponse(error)


def detail(request, index):
    if request.user.is_authenticated:
        post = get_object_or_404(Content, pk=index)
    else:
        return redirect('login')
    return render(request, 'detail.html', {'post':post})

def edit(request, index):
    if request.user.is_authenticated:
        post = get_object_or_404(Content, pk=index)
        if request.user.username == post.writerid:

            track_title = request.POST.get('track_title')
            track_artist = request.POST.get('track_artist')
            track_album_cover = request.POST.get('track_album_cover')
            track_audio = request.POST.get('track_audio')

            if request.method == "POST":
                form = ContentForm(request.POST, instance=post)
                if form.is_valid():
                    post = form.save(commit=False)
                    post.track_title = track_title
                    post.track_artist = track_artist
                    post.track_album_cover = track_album_cover
                    post.track_audio = track_audio
                    post.author = request.user
                    post.published_date = timezone.now
                    post.save()
                    return redirect('detail', index=post.pk)
                else:
                    messages.warning(request, "제목과 본문을 모두 써주세요.")
            else:
                form = ContentForm(instance=post)
        else:
            return redirect('home')
    else:
        return redirect('home')
    return render(request, 'edit.html', {'form':form, 'post':post})

def delete(request, pk):
    if request.user.is_authenticated:
        post = get_object_or_404(Content, pk=pk)
        if request.user.username == post.writerid:
            post.delete()
    return redirect('home')

def mypage(request):
    if request.user.is_authenticated:
        posts = Content.objects.order_by('-pub_date').filter(writerid=request.user.username)
    else:
        return redirect('login')
    return render(request, 'mylist.html', {'posts_list':posts})

def user_calendarview(request):
    #calendar
    contents = Content.objects.order_by('-pub_date').filter(writerid=request.user.username)
    return render(request, 'mycalendar.html', {'contents': contents})

def detail_cal(request, index):
    post = get_object_or_404(Content, pk=index)
    return render(request, 'detail.html', {'post':post})