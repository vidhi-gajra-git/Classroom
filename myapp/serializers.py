from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import *

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], 
        username=clean_data['username'],
        password=clean_data['password'],)
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(email=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValueError('user not found')
		return user


        
        
    
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
  
class AssignmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Assignment
        fields='__all__'
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Grade
        fields = '__all__'
class AssignmentSubmissionSerializer(serializers.ModelSerializer):


	class Meta:
		model = Submission
		fields =['file','submission_date']

	file = serializers.FileField()
	submission_date = serializers.DateTimeField()
   


    
	def create(self, clean_data,user,assignment,instructor):
		# print(clean_data['student'])
		# student_user=AppUser.objects.get(username=clean_data['student'])
		return Submission.objects.create(
        student=user,               
        assignment=assignment,
        file=clean_data['file'],
        submission_date=clean_data['submission_date'],
        instructor=instructor)
class UserAssignmentSubmissionSerializer(serializers.ModelSerializer):
	submission_id = serializers.IntegerField(source='id')

	class Meta:
		model = Submission
		fields = ['submission_id', 'student', 'assignment', 'file', 'submission_date', 'instructor']

	file = serializers.FileField()
	submission_date = serializers.DateTimeField()
