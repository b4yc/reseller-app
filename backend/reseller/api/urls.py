from django.urls.resolvers import URLPattern
from rest_framework import routers
from .api import BuyerViewset, CardViewset, ElectronicViewset, ExpenseViewset, ItemViewset, SaleViewset, SellerViewset, ShoeViewset

router = routers.DefaultRouter()
router.register('api/sellers', SellerViewset, 'sellers')
router.register('api/buyers', BuyerViewset, 'buyers')
router.register('api/items', ItemViewset, 'items')
router.register('api/electronics', ElectronicViewset, 'electronics')
router.register('api/shoes', ShoeViewset, 'shoes')
router.register('api/cards', CardViewset, 'cards')
router.register('api/sales', SaleViewset, 'sales')
router.register('api/expenses', ExpenseViewset, 'expenses')


urlpatterns = router.urls