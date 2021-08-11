from django.urls import path
from . import views  # posts > views에서 모든 함수를 가져온다.

urlpatterns = [
    # CRUD url
    path('new/', views.new, name="new"),
    path('detail/<int:index>', views.detail, name="detail"),
    path('edit/<int:index>', views.edit, name="edit"),
    path('detail/<int:pk>/delete', views.delete, name="delete"),

    # Mypage url
    path('mypage/', views.mypage, name="mypage"),
    path('mypage/cal', views.user_calendarview, name="mypage-cal"),

    #path('mypage/', views.user_listview),
    path('mypage/detail/<int:index>', views.detail_cal, name="detail_cal"),

    #path('search_home/', views.search_home, name="search_home"),
    path('new/search_query/', views.search_query, name="search_query"),
    path('edit/search_query/', views.search_query, name="search_query"),
    path('detail/', views.detail, name="detail"),

]