# Generated by Django 3.2.6 on 2021-08-06 05:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20210806_0201'),
    ]

    operations = [
        migrations.RenameField(
            model_name='content',
            old_name='track_title',
            new_name='track_title1',
        ),
    ]