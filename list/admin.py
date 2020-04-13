from django.contrib import admin

# Register your models here.
from .models import Task, Category

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
	list_display = ["title", "due_date", "done"]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ["name"]

