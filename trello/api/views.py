from django.shortcuts import render
from django.http import JsonResponse

from .models import *

# Create your views here.
def endpoints(request):
    return render(request, 'api/endpoints.html', status=200)


def fetch_users(request):
    persons = Person.objects.all()
    serialized_resp = [
        {
            'id':person.id, 
            'name':person.name, 
            'tasks': [{'id':task.id, 'details':task.details} for task in person.task_set.all()]
        } 
            for person in persons
    ]

    return JsonResponse(serialized_resp, status=200, safe=False)

def update_user(request, person_id):
    name = request.GET['name']
    person = Person.objects.get(id=person_id)
    person.name = name
    person.save()
    return JsonResponse({'name' : person.name}, safe=False, status=200)

def create_user(request):
    name = request.GET['name']
    person = Person(name=name)
    person.save()
    return JsonResponse({'id' : person.id, 'name' : person.name, 'tasks':[]}, status=200)

def create_task(request):
    person_id = request.GET['id']
    task_details = request.GET['task']
    person = Person.objects.get(id = person_id)
    task = Task(details=task_details, author=person)
    task.save()

    serialized_resp =[
        {
            'id' : person.id, 
            'name' : person.name, 
            'tasks':[{'id':task.id, 'details':task.details} for task in person.task_set.all()]}
    ]
    return JsonResponse(serialized_resp, status=200, safe=False)

def delete(request):
    user_id = request.GET.get('user_id')
    task_id = request.GET.get('task_id')

    if user_id:
        Person.objects.get(id=user_id).delete()
        return JsonResponse({'id' : user_id}, safe=False)
    else:
        Task.objects.get(id = task_id).delete()
        return JsonResponse({'id' : task_id}, safe=False)