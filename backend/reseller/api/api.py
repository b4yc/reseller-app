from api.models import Seller, Buyer, Item, Electronic, Shoe, Card, Sale, Expense
from rest_framework import viewsets, permissions
from .serializers import BuyerSerializer, CardSerializer, ElectronicSerializer, ExpenseSerializer, ItemSerializer, SaleSerializer, SellerSerializer, ShoeSerializer

# Seller Viewset
class SellerViewset(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SellerSerializer

    def get_queryset(self):
        queryset = Seller.objects.all()
        email = self.request.query_params.get('email')
        password = self.request.query_params.get('password')
        if email is not None and password is not None:
            queryset = queryset.filter(email=email, password=password)
        if queryset:
            return queryset
        else:
            raise NotFound()

class BuyerViewset(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BuyerSerializer

class ItemViewset(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ItemSerializer

class ElectronicViewset(viewsets.ModelViewSet):
    queryset = Electronic.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ElectronicSerializer

class ShoeViewset(viewsets.ModelViewSet):
    queryset = Shoe.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShoeSerializer

class CardViewset(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CardSerializer

class SaleViewset(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SaleSerializer

class ExpenseViewset(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExpenseSerializer