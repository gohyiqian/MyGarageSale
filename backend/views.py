from django.http import HttpResponse

def home(requests):
    return HttpResponse('Garage Sale!')