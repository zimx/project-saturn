# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('features', '0004_auto_20150910_1516'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feature',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]