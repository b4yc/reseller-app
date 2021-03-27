from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Buyer)
admin.site.register(models.Seller)
admin.site.register(models.Item)
admin.site.register(models.Electronic)
admin.site.register(models.Shoe)
admin.site.register(models.Card)
admin.site.register(models.Sale)
admin.site.register(models.Expense)
