from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework.authtoken.models import Token

class AppUserManager(BaseUserManager):
	def create_user(self, email, username,password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email,username, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email,username,password)
		user.is_staff = True
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	# id = models.AutoField(primary_key=True)
	is_staff = models.BooleanField(default=False)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	# USER_ID_FIELD='id'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username

class Course(models.Model):
   
    course_name = models.CharField(primary_key=True, max_length=255,default=None)
    description = models.TextField()
    
class Assignment(models.Model):
    title = models.CharField(primary_key=True ,max_length=100)
    description = models.TextField()
    due_date = models.DateTimeField()
    course_name = models.ForeignKey(Course,on_delete=models.CASCADE)
class Instructor (models.Model):

    instructor=models.CharField(primary_key=True,max_length=255,default=0)
    
    course=models.ForeignKey(Course, on_delete=models.CASCADE)   
class Submission(models.Model):
   
    student = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    file = models.FileField(upload_to='submissions/')
    submission_date = models.DateTimeField(auto_now_add=True)
    instructor=models.ForeignKey(Instructor, on_delete=models.CASCADE)
    
    
class Grade(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    grade = models.PositiveIntegerField()
    feedback = models.TextField()
class UserSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    file = models.FileField(upload_to='submissions/')
    updated_at = models.DateTimeField(auto_now=True)
# Create your mode
