"""
URL configuration for realty project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from atexit import register
from pydoc import plain_pager
from turtle import home
from django.contrib import admin
from django.urls import path
from platformdirs import user_log_dir

from catalog import views

urlpatterns = [
    # ... other URL patterns
    path('api/user/', views.validate_and_process_user, name='validate_and_process_user'),
    path('api/filter/', views.filter_apartments, name='filter_apartments'),
    path('main_page/', plain_pager.as_view(), name='main_page'),

]
