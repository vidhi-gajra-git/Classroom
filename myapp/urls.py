from django.urls import path,include
from . import views 
from .views import *
# from django.contrib.auth import views as auth_views
urlpatterns = [
   
    path('signup',views.UserRegister.as_view(),name="signup"),
    path('login',views.UserLogin.as_view(),name="login"),
    path('logout',views.UserLogout.as_view(),name="logout"),
    path('user',views.UserView.as_view(),name="user"),
    path('csrf_cookie',views.GETCSRFToken.as_view(),name="cookie"),
     path('courses', CourseView.as_view(), name='all_courses_api'),
     path('authenticated', CheckAuthenticatedView.as_view(), name='authenticated'),
     
     path('<course_name>/assignments', views.CourseAssignmentsView.as_view(), name='submit_assignment'),
    path('<assignment_title>/submit', views.AssignmentSubmissionView.as_view(), name='assignment_submission'),
     path('<assignment_title>/update', views.UpdateSubmission.as_view(), name='assignment_submission'),
     path('<assignment_title>/status', views.GetStatus.as_view(), name='assignment_submission'),
    path('<assignment_title>/delete', views.DeleteSubmission.as_view(), name='delete_submission'),
     path('usersubmission', views.UserSubmissionsView.as_view(), name='user_submission'),
     path('grades/<submission_id>', views.GradeView.as_view(), name='grade_view'),
     
      # path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    # path('<assignment_id>/submit/', views.update_submission, name='update_submission'),
    # path('submission/delete/', views.delete_submission, name='delete_submission'),
      
]