from rest_framework.serializers import ModelSerializer, SerializerMethodField
from djangojobboard.jobs.models import Job


class JobSerializer(ModelSerializer):
    is_owner = SerializerMethodField()

    class Meta:
        model = Job
        fields = (
            "id",
            "user",
            "title",
            "location",
            "remote",
            "salary",
            "date_created",
            "available",
            "company_name",
            "company_website",
            "company_logo",
            "sponsored",
            "is_owner"
        )
        read_only_fields = (
            "user",
            "date_created",
        )

    def get_is_owner(self, obj):
        user = self.context["request"].user
        return obj.user == user
