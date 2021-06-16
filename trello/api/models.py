from django.db import models

# Create your models here.

class Person (models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Task (models.Model):
    details = models.TextField(null=False)
    author = models.ForeignKey(Person, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.details

