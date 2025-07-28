from django.contrib import admin
from .models import (
    # Academic
    SchoolSession, SchoolClass, Section, CasteCategory,

    # Fees
    FeesTypeMaster, FeesGroup, FeesMaster, FeesDiscount,

    # Transport
    Route, Vehicle, PickupPoint, RouteVehicle, RoutePickupPoint,

    # Hostel
    RoomType, Hostel, HostelRoom
)

# ========== Academic Module ==========

@admin.register(SchoolSession)
class SchoolSessionAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)

@admin.register(SchoolClass)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'class_id', 'is_active')
    list_filter = ('class_id', 'is_active')
    search_fields = ('name',)

@admin.register(CasteCategory)
class CasteCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)

# ========== Fees Module ==========

@admin.register(FeesTypeMaster)
class FeesTypeMasterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'fees_code', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'fees_code')

@admin.register(FeesGroup)
class FeesGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)

@admin.register(FeesMaster)
class FeesMasterAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'fees_group', 'fees_type', 'due_date',
        'amount', 'fine_type', 'is_active'
    )
    list_filter = ('fees_group', 'fees_type', 'fine_type', 'is_active')
    search_fields = ('fees_group__name', 'fees_type__name')

@admin.register(FeesDiscount)
class FeesDiscountAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'discount_code', 'discount_type', 'is_active')
    list_filter = ('discount_type', 'is_active')
    search_fields = ('name', 'discount_code')

# ========== Transport Module ==========

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title',)

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('id', 'vehicle_number', 'vehicle_model', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('vehicle_number', 'vehicle_model')

@admin.register(PickupPoint)
class PickupPointAdmin(admin.ModelAdmin):
    list_display = ('id', 'pickup_point', 'latitude', 'longitude', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('pickup_point',)

@admin.register(RouteVehicle)
class RouteVehicleAdmin(admin.ModelAdmin):
    list_display = ('id', 'route', 'is_active')
    list_filter = ('route', 'is_active')
    search_fields = ('route__title',)
    filter_horizontal = ('vehicles',)

@admin.register(RoutePickupPoint)
class RoutePickupPointAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'route', 'pickup_point', 'distance',
        'pickup_time', 'monthly_fees', 'is_active'
    )
    list_filter = ('route', 'is_active')
    search_fields = ('route__title', 'pickup_point__pickup_point')

# ========== Hostel Module ==========

@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_type', 'is_active')
    search_fields = ('room_type',)
    list_filter = ('is_active',)

@admin.register(Hostel)
class HostelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'hostel_type', 'is_active')
    search_fields = ('name', 'hostel_type')
    list_filter = ('hostel_type', 'is_active')

@admin.register(HostelRoom)
class HostelRoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_no', 'hostel', 'room_type', 'number_of_beds', 'is_active')
    list_filter = ('hostel', 'room_type', 'is_active')
    search_fields = ('room_no',)
