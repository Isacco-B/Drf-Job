from djangojobboard.jobs.models import Job
from django.conf import settings
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import JobSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# from django.views.decorators.csrf import csrf_exempt
# from django.core.mail import send_mail
# from django.http import HttpResponse
from .permissions import IsJobOwner
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class JobListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobDetailtView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsJobOwner]
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.all()


class JobCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated, IsJobOwner]
    serializer_class = JobSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsJobOwner]
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsJobOwner]

    def get_queryset(self):
        return Job.objects.all()


class CreatePayment(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=10000,
                currency="usd",
                automatic_payment_methods={
                    "enabled": True,
                },
                metadata={
                    "job_id": request.data["job_id"]
                }
            )
            return Response({"clientSecret": intent["client_secret"]})
        except Exception as e:
            return Response({"error": str(e)}, status=403)

# @csrf_exempt
# def stripe_webhook(request):
#     payload = request.body
#     sig_header = request.META['HTTP_STRIPE_SIGNATURE']
#     event = None

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
#         )
#     except ValueError as e:
#         # Invalid payload
#         return HttpResponse(status=400)
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         return HttpResponse(status=400)

#     # Handle the checkout.session.completed event
#     if event['type'] == 'checkout.session.completed':
#         session = event['data']['object']
#         customer_email = session["customer_details"]["email"]
#         line_items = stripe.checkout.Session.list_line_items(session["id"])

#         stripe_price_id = line_items["data"][0]["price"]["id"]
#         price = Price.objects.get(stripe_price_id=stripe_price_id)
#         product = price.product

#         send_mail(
#             subject="Here is your product",
#             message=f"Thanks for your purchase. The URL is: {product.url}",
#             recipient_list=[customer_email],
#             from_email="your@email.com"
#         )

#     elif event["type"] == "payment_intent.succeeded":
#         intent = event['data']['object']

#         stripe_customer_id = intent["customer"]
#         stripe_customer = stripe.Customer.retrieve(stripe_customer_id)

#         customer_email = stripe_customer['email']
#         price_id = intent["metadata"]["price_id"]

#         price = Price.objects.get(id=price_id)
#         product = price.product

#         send_mail(
#             subject="Here is your product",
#             message=f"Thanks for your purchase. The URL is {product.url}",
#             recipient_list=[customer_email],
#             from_email="your@email.com"
#         )

#     return HttpResponse(status=200)
