from django.contrib import admin

# Register your models here.

from .models import *  # Import your models here
@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ( 'assignment', 'submission_date')  # Specify the fields to be displayed in the admin list view

admin.site.register(AppUser)  # Register your models here
admin.site.register(Assignment)
# admin.site.register(Submission)
admin.site.register(Grade)
admin.site.register(Course)
admin.site.register(Instructor)


