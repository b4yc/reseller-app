from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.
class Seller(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=150, null=True)

    def __str__(self):
        return "%s %s" % (self.firstName, self.lastName)


class Buyer(models.Model):
    seller = models.ForeignKey(Seller, on_delete=CASCADE, null=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    address = models.CharField(max_length=100)

    def __str__(self):
        return "%s %s" % (self.firstName, self.lastName)


class Item(models.Model):
    AVAILABLE = 'AVAILABLE'
    SOLD = 'SOLD'
    SHIPPED = 'SHIPPED'
    DELIVERED = 'DELIVERED'
    STATUS_CHOICES = [
        (AVAILABLE, 'Available'),
        (SOLD, 'Sold'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
    ]
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=100, choices = STATUS_CHOICES, default=AVAILABLE)
    askingPrice = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    boughtPrice = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    name = models.CharField(max_length=255, null=True)
    model = models.CharField(max_length=255, null=True)

    def __str__(self):
        return "{name}".format(name = self.name)


class Electronic(Item):
    brand = models.CharField(max_length=255)

    def __str__(self):
        return "Model: {model} Brand: {brand} Price: {askingPrice}".format(askingPrice = self.askingPrice,
        model = self.model, brand = self.brand)


class Shoe(Item):
    SIZE_CHOICES = [
        ('4', '4'),
        ('4.5', '4.5'),
        ('5', '5'),
        ('5.5', '5.5'),
        ('6', '6'),
        ('6.5', '6.5'),
        ('7', '7'),
        ('7.5', '7.5'),
        ('8', '8'),
        ('8.5', '8.5'),
        ('9', '9'),
        ('9.5', '9.5'),
        ('10', '10'),
        ('10.5', '10.5'),
        ('11', '11'),
        ('11.5', '11.5'),
        ('12', '12'),
        ('12.5', '12.5'),
        ('13', '13'),
    ]
        
    brand = models.CharField(max_length=255)
    size = models.CharField(max_length=100, choices = SIZE_CHOICES, default='4')

    def __str__(self):
        return "Model: {model} Brand: {brand} Size: {size} Price: {askingPrice}".format(askingPrice = self.askingPrice,
            model = self.model, brand = self.brand, size = self.size)


class Card(Item):
    brand = models.CharField(max_length=255)
    year = models.IntegerField()

    def __str__(self):
        return "Model: {model} Year: {year} Brand: {brand} Price: {askingPrice}".format(askingPrice = self.askingPrice,
            model = self.model, brand = self.brand, year = self.year)


class Sale(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Buyer, on_delete=CASCADE)
    item = models.ForeignKey(Item, on_delete=CASCADE)
    date = models.DateField(auto_now=False, blank=True)


class Expense(models.Model):
    seller = models.ForeignKey(Seller, on_delete=CASCADE)
    moneySpent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)