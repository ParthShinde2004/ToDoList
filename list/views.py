from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404

from .models import Task, Category

# Create your views here.
def home(request):
	categories = Category.objects.all()
	data = {}
	for c in categories:
		data[c] = c.task_set.filter(done=False)
	return render(request, "home.html", {"data": data})


def new_task(request):
	post = request.POST
	print(post)
	new_title = post.get("newTask")
	c = post.get("taskCategory")
	print("--------------------------")
	print(new_title)
	print(c)
	# new_due_date = post.get("newTask")
	# new_done = 
	new_priority = 'L'
	new_category = Category.objects.get(id=c)
	print(new_category)
	new = Task(title=new_title, priority=new_priority, category=new_category)
	new.save()
	return JsonResponse({"title": new_title, "category": c, "id": new.pk})
	# return HttpResponse(json.dumps(response_data), content_type="application/json")


def new_list(request):
	post = request.POST
	newName = post.get("newList").strip()
	if newName == "":
		raise Http404
	new = Category(name=newName)
	new.save()
	return JsonResponse({"name": new.name, "id": new.pk})


def delete_task(request, id):
	try:
		d = Task.objects.get(pk=id)
		d.delete()
	except Task.DoesNotExist:
		raise Http404
	return JsonResponse({"deleted": True})
	# taskName = post.get()

def delete_list(request, id):
	try:
		d = Category.objects.get(pk=id)
		d.delete()
	except Category.DoesNotExist:
		raise Http404
	return JsonResponse({"deleted": True})


def check_task(request, id):
	try:
		d = Task.objects.get(pk=id)
		print(f"task status is {d.done}")
		d.done = not d.done;
		print(f"task status is now {d.done}")
		d.save()
	except Task.DoesNotExist:
		raise Http404
	return JsonResponse({"checked": True});


def category_list(request):
	categories = Category.objects.all()
	return render(request, "categorylist.html", {"categories":categories})

def task_list(request):
	categories = Category.objects.all()
	data = {}
	for c in categories:
		data[c] = c.task_set.filter(done=False)
	return render(request, "tasklist.html", {"data": data})

def text_area(request):
	categories = Category.objects.all()
	return render(request, "textarea.html", {"categories":categories})







