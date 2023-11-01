from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from datetime import datetime


# from rest_framework import permission 
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import *
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
# from django.views.generic import ListView
from django.utils import timezone
from django.contrib.auth import authenticate 
from rest_framework_simplejwt.tokens import RefreshToken
from  django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator

from .models import *
@method_decorator(csrf_protect,name='dispatch')
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
 
	def post(self, request):
		clean_data = custom_validation(request.data)
		
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_protect,name='dispatch')
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			print(serializer.data)
			return Response(serializer.data, status=status.HTTP_200_OK)


		    
            
            
		return Response({'error':"Username already exists or password incorrect"}, status=status.HTTP_400_BAD_REQUEST)
	


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response( serializer.data, status=status.HTTP_200_OK)


class CourseAssignmentsView(APIView):
   
  

    def get(self,request,course_name,format=None):
        # course_name= self.kwargs['course_name']
        assignments = Assignment.objects.filter(course_name=course_name)
        serializer=AssignmentSerializer(assignments,many=True)
        return Response(serializer.data)
class CourseView(APIView):
	def get(self, request, format=None):
		courses = Course.objects.all()
		serializer = CourseSerializer(courses, many=True)
		
		return Response(serializer.data)
		
		
		
		
			




class UserSubmissionsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request, *args, **kwargs):
        date_str = request.GET.get('date')  # Get the date from the API request
        if date_str:
            try:
                date = datetime.strptime(date_str, '%Y-%m-%d').date()  # Convert the date string to datetime.date object
                aware_datetime = timezone.make_aware(datetime.combine(date, datetime.min.time()))  # Convert datetime.date to datetime.datetime with timezone information
                all_submissions = Submission.objects.filter(student=self.request.user, submission_date__date=aware_datetime)
            except ValueError:
                return Response({'error': 'Invalid date format. Please use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            all_submissions = Submission.objects.filter(student=self.request.user)

        serializer = UserAssignmentSubmissionSerializer(all_submissions, many=True)
        return Response(serializer.data)

class GradeView(APIView):
	
	def get(self,request, submission_id,*args,**kwargs):
		try:
			submission = Submission.objects.get(pk=submission_id)
		except Submission.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)

		grades = Grade.objects.get(submission=submission) 
		# replace with your actual API call
		serializer=GradeSerializer(	grades)
	
		return Response(serializer.data)
		
		# return Response(status=status.HTTP_400_BAD_REQUEST)

class UpdateSubmission(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def post(self, request,assignment_title):
		user_submission = Submission.objects.get(student=self.request.user,assignment=assignment_title)
		# submission = user_submission.submission
		if user_submission is not None :

			try:
				user_submission.file = request.FILES['file']
				user_submission.save()
				user_submission.updated_at = timezone.now()
				user_submission.save()
				return Response({'success':'Updated Successfully'},status=status.HTTP_202_ACCEPTED)
			except Exception as e:
		
				return Response({'error':f'Invalid Request {e}'},status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({'error':'No file found '},status=status.HTTP_400_BAD_REQUEST)

# @login_required
class DeleteSubmission(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request, assignment_title):
        user = self.request.user

        user_submission = Submission.objects.filter(student=user,assignment=assignment_title).first()
        
        if user_submission is not None:
            assignment_id = user_submission.assignment.title
            print('delete assignment',assignment_id)
            user_submission.delete()  # Delete the submission
            return Response({'success': 'Assignment deleted Successfully '}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({'error': 'Submission not found '}, status=status.HTTP_404_NOT_FOUND)

      

class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            # username = user.username

            # user_profile = AppUser.objects.get(user=user)
            user_profile = UserSerializer(user)
           

            return Response({ 'profile': user_profile.data })
        except:
            return Response({ 'error': 'Something went wrong when retrieving profile' },status=status.HTTP_400_BAD_REQUEST)







class AssignmentSubmissionView(APIView):
    # parser_classes = (MultiPartParser,)
    
	authentication_classes = (SessionAuthentication,)
	# # permission_classes = (permissions.AllowAny,)
	permission_classes = (permissions.IsAuthenticated,)
 
	def post(self, request,assignment_title, format=None):
		try:
			user_submission =Submission.objects.get(student=request.user,assignment=assignment_title)
		except:
		
		
			# Retrieve the assignment object
			try:
				data=request.data
				assignment = get_object_or_404(Assignment, pk=data['assignment'])
				course=assignment.course_name
				print(course)
				instructor=get_object_or_404(Instructor,course=course)
			except Assignment.DoesNotExist:
				return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)
			# user = authenticate(username=request.user.username,password=request.user.password)
			# Create submission data
			submission_data = {
				
				'file': data['file'], 
				'submission_date': timezone.now() 
				
			}
			serializer = AssignmentSubmissionSerializer(data=submission_data)
			
			if serializer.is_valid(raise_exception=True):
				user=request.user
				
				submission=serializer.create(submission_data,user=user,assignment=assignment, instructor=instructor)
				
					
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response({'error':'some error'},status=status.HTTP_400_BAD_REQUEST)
		else:
				return Response({'error':'A file already exists'},status=status.HTTP_400_BAD_REQUEST)
		
      
          
		
@method_decorator(ensure_csrf_cookie,name='dispatch')
class GETCSRFToken(APIView):
    permission_classes =(permissions.AllowAny,)
    def get(self, request,format=None):
        return Response({'success':'CSRF Cookie set'})

@method_decorator(csrf_protect,name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request,format=None):
        user=self.request.user
        
        isAuthenticated =user.is_authenticated
        try:
            isAuthenticated=user.is_authenticated
            if isAuthenticated:
                  return Response({'isAuthenticated': 'Authenticated','username':user.username})
            else:
                return Response({'isAuthenticated': 'error'})
        except :
              return Response({'error':'Something went wrong'})
class GetStatus(APIView):
	def get(self, request,assignment_title):
		try :
			user_submission = Submission.objects.get(student=request.user,assignment=assignment_title)
			file=user_submission.file
			updated=user_submission.updated_at
			if user_submission is not None :
				return Response({'file':file, 'updated':updated},status=status.HTTP_200_OK)
		except :
			return Response({'error':'No file '})