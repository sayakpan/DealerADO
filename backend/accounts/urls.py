from django.urls import path
from .views import ChangePasswordView, DeactivateUserView, LogoutView, RegisterView, LoginView, UserDataView, ForgotPasswordView, ResetPasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('userdata/', UserDataView.as_view(), name='userdata'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('deactivate/', DeactivateUserView.as_view(), name='deactivate-user'),
]