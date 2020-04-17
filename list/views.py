from django.shortcuts import render
from django.http import HttpResponse

from .models import Task, Category

# Create your views here.
def home(request):
	categories = Category.objects.all()
	return render(request, "home.html", {"categories":categories})

def list(request, category):
	categories = Category.objects.all()
	try:
		category = Category.objects.get(name=category)
	except Category.DoesNotExist:
		return render(request, "home.html", {"categories":categories})
	return render(request, "list.html", {"categories": categories, "category":category})

