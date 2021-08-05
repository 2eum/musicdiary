from django.shortcuts import render

# Create your views here.

def user_listview(request):
    return render(request, 'user-listview.html')