# Generated by Django 4.0.3 on 2023-09-06 17:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_rename_appiontment_appointment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='resaon',
            new_name='reason',
        ),
    ]