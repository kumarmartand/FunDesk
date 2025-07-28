from django.conf import settings
from rest_framework import serializers
from .models import (
    SchoolClass, Section, CasteCategory, SchoolSession,
    FeesTypeMaster, FeesGroup, FeesMaster, FeesDiscount,
    Route, Vehicle, PickupPoint, RouteVehicle, RoutePickupPoint,
    RoomType, Hostel, HostelRoom,
)

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolClass
        fields = ['id', 'name', 'is_active']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = SchoolClass.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Class with name '{value}' already exists.")
        return value

class SectionSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='class_id.name', read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'name', 'class_id', 'class_name', 'is_active']

    def validate(self, data):
        instance = getattr(self, 'instance', None)
        name = data.get('name', getattr(instance, 'name', None))
        class_id = data.get('class_id', getattr(instance, 'class_id', None))
        queryset = Section.objects.filter(name=name, class_id=class_id)
        if instance:
            queryset = queryset.exclude(pk=instance.pk)
        if queryset.exists():
            raise serializers.ValidationError({
                'name': f"A section with the name '{name}' already exists in the selected class."
            })
        return data

class CasteCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CasteCategory
        fields = ['id', 'name', 'description', 'is_active']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = CasteCategory.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Caste category with name '{value}' already exists.")
        return value

class SchoolSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolSession
        fields = ['id', 'name', 'start_date', 'end_date', 'is_active']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = SchoolSession.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Session with name '{value}' already exists.")
        return value

class FeesTypeMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeesTypeMaster
        fields = ['id', 'name', 'fees_code', 'description', 'is_active']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = FeesTypeMaster.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Fees type with name '{value}' already exists.")
        return value

class FeesGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeesGroup
        fields = ['id', 'name', 'description', 'is_active']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = FeesGroup.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Fees group with name '{value}' already exists.")
        return value

class FeesMasterSerializer(serializers.ModelSerializer):
    fees_group_name = serializers.CharField(source='fees_group.name', read_only=True)
    fees_type_name = serializers.CharField(source='fees_type.name', read_only=True)

    class Meta:
        model = FeesMaster
        fields = [
            'id', 'fees_group', 'fees_type', 'fees_group_name', 'fees_type_name',
            'due_date', 'amount', 'fine_type', 'percentage', 'fix_amount', 'is_active'
        ]

    def validate(self, data):
        instance = getattr(self, 'instance', None)
        fees_group = data.get('fees_group', getattr(instance, 'fees_group', None))
        fees_type = data.get('fees_type', getattr(instance, 'fees_type', None))
        due_date = data.get('due_date', getattr(instance, 'due_date', None))
        queryset = FeesMaster.objects.filter(fees_group=fees_group, fees_type=fees_type, due_date=due_date)
        if instance:
            queryset = queryset.exclude(pk=instance.pk)
        if queryset.exists():
            raise serializers.ValidationError({
                'due_date': "A fees master record with this group, type, and due date already exists."
            })
        return data

class FeesDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeesDiscount
        fields = [
            'id', 'name', 'discount_code', 'discount_type',
            'percentage', 'amount', 'description', 'is_active'
        ]

    def validate_discount_code(self, value):
        instance = getattr(self, 'instance', None)
        qs = FeesDiscount.objects.filter(discount_code=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Discount with code '{value}' already exists.")
        return value

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'title', 'is_active']

    def validate_title(self, value):
        instance = getattr(self, 'instance', None)
        qs = Route.objects.filter(title=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Route with title '{value}' already exists.")
        return value

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            'id', 'vehicle_number', 'vehicle_model', 'year_made',
            'registration_number', 'chasis_number', 'max_seating_capacity',
            'driver_name', 'driver_licence', 'driver_contact_no',
            'vehicle_photo', 'note', 'is_active'
        ]

    def validate_vehicle_number(self, value):
        instance = getattr(self, 'instance', None)
        qs = Vehicle.objects.filter(vehicle_number=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Vehicle with number '{value}' already exists.")
        return value

class PickupPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickupPoint
        fields = ['id', 'pickup_point', 'latitude', 'longitude', 'is_active']

    def validate_pickup_point(self, value):
        instance = getattr(self, 'instance', None)
        qs = PickupPoint.objects.filter(pickup_point=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Pickup point '{value}' already exists.")
        return value

class RouteVehicleSerializer(serializers.ModelSerializer):
    route_title = serializers.CharField(source='route.title', read_only=True)
    vehicles_data = VehicleSerializer(source='vehicles', many=True, read_only=True)

    class Meta:
        model = RouteVehicle
        fields = ['id', 'route', 'route_title', 'vehicles', 'vehicles_data', 'is_active']

class RoutePickupPointSerializer(serializers.ModelSerializer):
    route_title = serializers.CharField(source='route.title', read_only=True)
    pickup_point_name = serializers.CharField(source='pickup_point.pickup_point', read_only=True)

    class Meta:
        model = RoutePickupPoint
        fields = [
            'id', 'route', 'route_title', 'pickup_point', 'pickup_point_name',
            'distance', 'pickup_time', 'monthly_fees', 'is_active'
        ]

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ['id', 'room_type', 'description']

    def validate_room_type(self, value):
        instance = getattr(self, 'instance', None)
        qs = RoomType.objects.filter(room_type=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Room type '{value}' already exists.")
        return value

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = ['id', 'name', 'hostel_type', 'address', 'intake', 'description']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = Hostel.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Hostel with name '{value}' already exists.")
        return value

class HostelRoomSerializer(serializers.ModelSerializer):
    hostel_name = serializers.CharField(source='hostel.name', read_only=True)
    room_type_name = serializers.CharField(source='room_type.room_type', read_only=True)

    class Meta:
        model = HostelRoom
        fields = [
            'id', 'room_no', 'hostel', 'hostel_name', 'room_type',
            'room_type_name', 'number_of_beds', 'cost_per_bed', 'description'
        ]

    def validate(self, data):
        instance = getattr(self, 'instance', None)
        room_no = data.get('room_no', getattr(instance, 'room_no', None))
        hostel = data.get('hostel', getattr(instance, 'hostel', None))
        queryset = HostelRoom.objects.filter(room_no=room_no, hostel=hostel)
        if instance:
            queryset = queryset.exclude(pk=instance.pk)
        if queryset.exists():
            raise serializers.ValidationError({
                'room_no': f"Hostel room with number '{room_no}' already exists in the hostel '{hostel.name}'."
            })
        return data
