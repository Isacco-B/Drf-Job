from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter
from djangojobboard.jobs.api.views import (
    JobListView,
    JobCreateView,
    JobUpdateView,
    JobDeleteView,
    JobDetailtView,
    CreatePayment
)
from djangojobboard.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)


app_name = "api"

urlpatterns = [
    path("jobs/", JobListView.as_view()),
    path("create-job/", JobCreateView.as_view()),
    path("job/<pk>/update/", JobUpdateView.as_view()),
    path("job/<pk>/", JobDetailtView.as_view()),
    path("job/<pk>/delete/", JobDeleteView.as_view()),
    path("payments/create-payment/", CreatePayment.as_view()),
]

urlpatterns += router.urls
