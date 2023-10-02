# Generated by Django 3.2.9 on 2023-09-29 14:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_job_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='SponsoredJobPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_until', models.DateTimeField(blank=True)),
                ('stripe_payment_intent_id', models.CharField(max_length=150)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sponsored_post', to='jobs.job')),
            ],
            options={
                'verbose_name': 'SponsoredJobPost',
                'verbose_name_plural': 'SponsoredJobPosts',
            },
        ),
    ]
