# Generated by Django 3.1.7 on 2021-04-13 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210326_2232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='askingPrice',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='item',
            name='boughtPrice',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]