from django.db import models
from datetime import datetime

# Create your models here.
class Task(models.Model):
	PRIORITY_CHOICES = [('C', 'Critical'),('H','High'), ('M', 'Medium'), ('L', 'Low')]
	title = models.CharField(max_length=100)
	due_date = models.DateTimeField(blank=True, default=datetime.now)
	done = models.BooleanField(default=False)
	priority = models.CharField(choices=PRIORITY_CHOICES, max_length=10)
	category = models.ForeignKey('Category')

class Category(models.Model):
	name = models.CharField(max_length=50, unique=True, blank=False)

	def __str__(self):
		return self.name




