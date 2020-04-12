from django.db import models

# Create your models here.
class Task(models.Model):
	title = models.CharField(max_length=100)
	due_date = models.DateTimeField(blank=True, default=None)
	done = models.BooleanField(default=False)
	tag = models.CharField(max_length=100, default="untagged")

