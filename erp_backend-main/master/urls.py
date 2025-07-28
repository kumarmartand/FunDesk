from django.urls import path
from .views import (
    ClassViewSet, SectionViewSet, 
    CasteCategoryViewSet, SchoolSessionViewSet,
    AllMastersAPIView   
)
from .fees_views import (
    FeesTypeMasterViewSet, FeesGroupViewSet,
    FeesMasterViewSet, FeesDiscountViewSet
)
from .transport_views import (
    RouteViewSet, VehicleViewSet,
    PickupPointViewSet, RouteVehicleViewSet,
    RoutePickupPointViewSet
)
from .hostel_views import (
    RoomTypeViewSet, HostelViewSet, HostelRoomViewSet
)

urlpatterns = [
    # ClassViewSet URLs
    path('classes/', ClassViewSet.as_view({'post': 'post'}), name='class-list'),
    path('classes/create/', ClassViewSet.as_view({'post': 'create'}), name='class-create'),
    path('classes/<int:pk>/', ClassViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='class-retrieve-update-destroy'),
    path('classes/all/', ClassViewSet.as_view({'get': 'get_all'}), name='class-get-all'),

    # SectionViewSet URLs
    path('sections/', SectionViewSet.as_view({'post': 'post'}), name='section-list'),
    path('sections/create/', SectionViewSet.as_view({'post': 'create'}), name='section-create'),
    path('sections/<int:pk>/', SectionViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='section-retrieve-update-destroy'),

    # CasteCategoryViewSet URLs
    path('castes/', CasteCategoryViewSet.as_view({'post': 'post'}), name='caste-list'),
    path('castes/create/', CasteCategoryViewSet.as_view({'post': 'create'}), name='caste-create'),
    path('castes/<int:pk>/', CasteCategoryViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='caste-retrieve-update-destroy'),

    # SchoolSessionViewSet URLs
    path('sessions/', SchoolSessionViewSet.as_view({'post': 'post'}), name='session-list'),
    path('sessions/create/', SchoolSessionViewSet.as_view({'post': 'create'}), name='session-create'),
    path('sessions/<int:pk>/', SchoolSessionViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='session-retrieve-update-destroy'),

    # FeesTypeMaster URLs
    path('fees/type/', FeesTypeMasterViewSet.as_view({'post': 'post'})),
    path('fees/type/create/', FeesTypeMasterViewSet.as_view({'post': 'create'})),
    path('fees/type/<int:pk>/', FeesTypeMasterViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('fees/type/all/', FeesTypeMasterViewSet.as_view({'get': 'get_all'})),

    # FeesGroup URLs
    path('fees/group/', FeesGroupViewSet.as_view({'post': 'post'})),
    path('fees/group/create/', FeesGroupViewSet.as_view({'post': 'create'})),
    path('fees/group/<int:pk>/', FeesGroupViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('fees/group/all/', FeesGroupViewSet.as_view({'get': 'get_all'})),

    # FeesMaster URLs
    path('fees/master/', FeesMasterViewSet.as_view({'post': 'post'})),
    path('fees/master/create/', FeesMasterViewSet.as_view({'post': 'create'})),
    path('fees/master/<int:pk>/', FeesMasterViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('fees/master/all/', FeesMasterViewSet.as_view({'get': 'get_all'})),

    # FeesDiscount URLs
    path('fees/discount/', FeesDiscountViewSet.as_view({'post': 'post'})),
    path('fees/discount/create/', FeesDiscountViewSet.as_view({'post': 'create'})),
    path('fees/discount/<int:pk>/', FeesDiscountViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('fees/discount/all/', FeesDiscountViewSet.as_view({'get': 'get_all'})),

    # ===== Transport Module URLs =====
    path('transport/routes/', RouteViewSet.as_view({'post': 'post'})),
    path('transport/routes/create/', RouteViewSet.as_view({'post': 'create'})),
    path('transport/routes/<int:pk>/', RouteViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('transport/routes/all/', RouteViewSet.as_view({'get': 'get_all'})),

    path('transport/vehicles/', VehicleViewSet.as_view({'post': 'post'})),
    path('transport/vehicles/create/', VehicleViewSet.as_view({'post': 'create'})),
    path('transport/vehicles/<int:pk>/', VehicleViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('transport/vehicles/all/', VehicleViewSet.as_view({'get': 'get_all'})),

    path('transport/pickup-points/', PickupPointViewSet.as_view({'post': 'post'})),
    path('transport/pickup-points/create/', PickupPointViewSet.as_view({'post': 'create'})),
    path('transport/pickup-points/<int:pk>/', PickupPointViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('transport/pickup-points/all/', PickupPointViewSet.as_view({'get': 'get_all'})),

    path('transport/route-vehicles/', RouteVehicleViewSet.as_view({'post': 'post'})),
    path('transport/route-vehicles/create/', RouteVehicleViewSet.as_view({'post': 'create'})),
    path('transport/route-vehicles/<int:pk>/', RouteVehicleViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('transport/route-vehicles/all/', RouteVehicleViewSet.as_view({'get': 'get_all'})),

    path('transport/route-pickup-points/', RoutePickupPointViewSet.as_view({'post': 'post'})),
    path('transport/route-pickup-points/create/', RoutePickupPointViewSet.as_view({'post': 'create'})),
    path('transport/route-pickup-points/<int:pk>/', RoutePickupPointViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('transport/route-pickup-points/all/', RoutePickupPointViewSet.as_view({'get': 'get_all'})),

    # ===== Hostel Module URLs =====
    path('hostel/room-types/', RoomTypeViewSet.as_view({'post': 'post'})),
    path('hostel/room-types/create/', RoomTypeViewSet.as_view({'post': 'create'})),
    path('hostel/room-types/<int:pk>/', RoomTypeViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('hostel/room-types/all/', RoomTypeViewSet.as_view({'get': 'get_all'})),

    path('hostel/hostels/', HostelViewSet.as_view({'post': 'post'})),
    path('hostel/hostels/create/', HostelViewSet.as_view({'post': 'create'})),
    path('hostel/hostels/<int:pk>/', HostelViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('hostel/hostels/all/', HostelViewSet.as_view({'get': 'get_all'})),

    path('hostel/rooms/', HostelRoomViewSet.as_view({'post': 'post'})),
    path('hostel/rooms/create/', HostelRoomViewSet.as_view({'post': 'create'})),
    path('hostel/rooms/<int:pk>/', HostelRoomViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('hostel/rooms/all/', HostelRoomViewSet.as_view({'get': 'get_all'})),

    # ===== All Masters Combined Data =====
    path('masters/all/', AllMastersAPIView.as_view(), name='all-masters-data'),
]
