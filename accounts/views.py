from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect, render
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .forms import SignupForm
from accounts.models import CustomUser
from django.contrib import messages

def signup_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method =="POST":
            form =SignupForm(request.POST)
            if CustomUser.objects.filter(nickname=request.POST['nickname']).exists():
                messages.warning(request, "이미 사용 중인 닉네임입니다.")
                return redirect('signup')
            else:
                if form.is_valid():
                    user = form.save()
                    login(request,user)
                    return redirect('home')
        else:        
            form = SignupForm()
    return render(request,'signup.html',{'form':form})

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method =="POST":
            form = AuthenticationForm(request, request.POST)
            if form.is_valid():
                username = form.cleaned_data.get("username")
                password = form.cleaned_data.get("password")
                user = authenticate(request=request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return redirect('home')
        else:       
            form = AuthenticationForm()
    return render(request,'login.html',{'form':form})

def logout_view(request):
    logout(request)
    return redirect('home')
