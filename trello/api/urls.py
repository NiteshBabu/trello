from django.urls import path
from .views import *

urlpatterns =[
    path('endpoints/', endpoints, name='api-endpoints'),
    path('users/', fetch_users, name='api-fetch_users'),
    path('update/<int:person_id>', update_user, name='api-update_user'),
    path('create_user/', create_user, name='api-create_user'),
    path('create_task/', create_task, name='api-create_task'),
    path('delete/', delete, name='api-delete'),

]