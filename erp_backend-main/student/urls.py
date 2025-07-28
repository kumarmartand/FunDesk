from django.urls import path
from .views import (
    HouseViewSet, StudentViewSet
)

urlpatterns = [
    # HouseViewset URLs
    path('house/', HouseViewSet.as_view({'post': 'post'})),
    path('house/create/', HouseViewSet.as_view({'post': 'create'})),
    path('house/<int:pk>/', HouseViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('house/all/', HouseViewSet.as_view({'get': 'get_all'})),

    # StudentViewset URLs
    path('', StudentViewSet.as_view({'post': 'post'})),
    path('create/', StudentViewSet.as_view({'post': 'create'})),
    path('<int:pk>/', StudentViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('all/', StudentViewSet.as_view({'get': 'get_all'})),
]
