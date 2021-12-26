# Generated by Django 3.2.9 on 2021-12-09 02:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0011_usertype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertype',
            name='is_buyer',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='usertype',
            name='is_seller',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='usertype',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
