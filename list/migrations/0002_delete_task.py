# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2020-04-13 10:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Task',
        ),
    ]
