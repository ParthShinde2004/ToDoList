"""todolist URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from list import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.home, name="home"),
    url(r'^new_task/$', views.new_task, name="newtask"),
    url(r'^new_list/$', views.new_list, name="newlist"),
    url(r'^delete_task/(\d+)$', views.delete_task, name="deletetask"),
    url(r'^delete_list/(\d+)$', views.delete_list, name="deletelist"),
    url(r'^categorylist/$', views.category_list, name="categorylist"),
    url(r'^tasklist/$', views.task_list, name="tasklist"),
    url(r'^textarea/$', views.text_area, name="textarea"),
    url(r'^check_task/(\d+)$', views.check_task, name="checktask"),
]
