# Generated by Django 3.2.6 on 2021-08-09 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_remove_content_is_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='writerid',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]