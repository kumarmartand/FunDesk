import json
from collections import defaultdict
from rest_framework import serializers
from .models import (
    House, StudentAdmission, StudentPersonalDetail, StudentPhysicalDetail,
    StudentTransportDetail, StudentHostelDetail, StudentFeesDetail,
    StudentParentDetail, StudentGuardianDetail, StudentAddressDetail,
    StudentBankDetail, StudentDocument
)
from master.models import (
    Route, RoutePickupPoint, Hostel, HostelRoom, FeesMaster,
    Vehicle
)


class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ['id', 'name', 'is_active']

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        qs = House.objects.filter(name=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"House with name '{value}' already exists.")
        return value


class StudentPersonalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPersonalDetail
        exclude = ['student']


class StudentPhysicalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPhysicalDetail
        exclude = ['student']


class StudentTransportDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTransportDetail
        exclude = ['student']


class StudentHostelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentHostelDetail
        exclude = ['student']


class StudentFeesDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFeesDetail
        exclude = ['student']


class StudentParentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentParentDetail
        exclude = ['student']


class StudentGuardianDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGuardianDetail
        exclude = ['student']


class StudentAddressDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAddressDetail
        exclude = ['student']


class StudentBankDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentBankDetail
        exclude = ['student']


class StudentDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDocument
        exclude = ['student']


class StudentFeesDetailNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFeesDetail
        exclude = ['student']


class FlatStudentSerializer(serializers.ModelSerializer):
    # Personal
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    gender = serializers.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], write_only=True)
    date_of_birth = serializers.DateField(write_only=True)
    religion = serializers.CharField(write_only=True, required=False, allow_blank=True)
    caste = serializers.CharField(write_only=True, required=False, allow_blank=True)
    mobile_number = serializers.CharField(write_only=True, required=False, allow_blank=True)
    email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    student_photo = serializers.CharField(write_only=True, required=False)

    # Physical
    height = serializers.DecimalField(max_digits=5, decimal_places=2, write_only=True, required=False)
    weight = serializers.DecimalField(max_digits=5, decimal_places=2, write_only=True, required=False)
    blood_group = serializers.ChoiceField(
        choices=[('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
                 ('O+', 'O+'), ('O-', 'O-'), ('AB+', 'AB+'), ('AB-', 'AB-')],       
        write_only=True, required=False, allow_null=True
    )

    # Transport
    vehicle = serializers.PrimaryKeyRelatedField(queryset=Vehicle.objects.all(), write_only=True, required=False, allow_null=True)
    pickup_point = serializers.PrimaryKeyRelatedField(queryset=RoutePickupPoint.objects.all(), write_only=True, required=False, allow_null=True)

    # Hostel
    hostel = serializers.PrimaryKeyRelatedField(queryset=Hostel.objects.all(), write_only=True, required=False, allow_null=True)
    hostel_room = serializers.PrimaryKeyRelatedField(queryset=HostelRoom.objects.all(), write_only=True, required=False, allow_null=True)

    # Parent / Guardian
    father_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    mother_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    father_phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    mother_phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    father_occupation = serializers.CharField(write_only=True, required=False, allow_blank=True)
    mother_occupation = serializers.CharField(write_only=True, required=False, allow_blank=True)
    guardian_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    guardian_relation = serializers.CharField(write_only=True, required=False)
    guardian_photo = serializers.CharField(write_only=True, required=False)
    guardian_phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    guardian_occupation = serializers.CharField(write_only=True, required=False, allow_blank=True)
    guardian_email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    guardian_address = serializers.CharField(write_only=True, required=False, allow_blank=True)
    guardian_type = serializers.ChoiceField(
        choices=[('Father', 'Father'), ('Mother', 'Mother'), ('Other', 'Other')],
        write_only=True, required=False, default='Other'
    )

    # Address
    is_guardian_address_same_as_current = serializers.BooleanField(write_only=True, required=False, default=False)
    is_permanent_same_as_current = serializers.BooleanField(write_only=True, required=False, default=False)
    # Address
    current_address = serializers.CharField(write_only=True, required=False, allow_blank=True)
    permanent_address = serializers.CharField(write_only=True, required=False, allow_blank=True)

    # Bank
    bank_account_number = serializers.CharField(write_only=True, required=False, allow_blank=True)
    bank_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    ifsc_code = serializers.CharField(write_only=True, required=False, allow_blank=True)
    national_id = serializers.CharField(write_only=True, required=False, allow_blank=True)  
    local_id = serializers.CharField(write_only=True, required=False, allow_blank=True)
    rte = serializers.ChoiceField(
        choices=[('Yes', 'Yes'), ('No', 'No')],
        write_only=True, required=False, default='No'
    )
    previous_school_note = serializers.CharField(write_only=True, required=False, allow_blank=True)
    note = serializers.CharField(write_only=True, required=False, allow_blank=True)


    
    father_photo = serializers.CharField(write_only=True, required=False)
    mother_photo = serializers.CharField(write_only=True, required=False)

    # Fees & Documents
    fee_details = serializers.CharField(required=False)
    documents = serializers.ListField(child=serializers.DictField(), write_only=True, required=False)

    school_class_name = serializers.CharField(source='school_class.name', read_only=True)
    section_name = serializers.CharField(source='section.name', read_only=True)
    house_name = serializers.CharField(source='physical.house', read_only=True, default=None)
    vehicle_name = serializers.CharField(source='transport.vehicle', read_only=True, default=None)
    route_name = serializers.SerializerMethodField()
    route_id = serializers.SerializerMethodField()
    pickup_point_name = serializers.CharField(source='transport.pickup_point', read_only=True, default=None)
    hostel_name = serializers.CharField(source='hostel.hostel.name', read_only=True, default=None)
    hostel_room_no = serializers.CharField(source='hostel.hostel_room.room_no', read_only=True, default=None)
    hostel_room_type = serializers.CharField(source='hostel.hostel_room.room_type.room_type', read_only=True, default=None)
    
    class Meta:
        model = StudentAdmission
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Flatten related one-to-one objects
        def flatten(obj, serializer_class):
            return serializer_class(obj).data if obj else {}

        related_serializers = [
            (getattr(instance, 'personal', None), StudentPersonalDetailSerializer),
            (getattr(instance, 'physical', None), StudentPhysicalDetailSerializer),
            (getattr(instance, 'transport', None), StudentTransportDetailSerializer),
            (getattr(instance, 'hostel', None), StudentHostelDetailSerializer),
            (getattr(instance, 'parents', None), StudentParentDetailSerializer),
            (getattr(instance, 'guardian', None), StudentGuardianDetailSerializer),
            (getattr(instance, 'address', None), StudentAddressDetailSerializer),
            (getattr(instance, 'bank', None), StudentBankDetailSerializer),
        ]

        for obj, serializer in related_serializers:
            flat_data = flatten(obj, serializer)
            data.update(flat_data)

        # For related_name='fee_details' and 'documents'
        data['fee_details'] = StudentFeesDetailNestedSerializer(instance.fee_details.all(), many=True).data
        data['documents'] = StudentDocumentSerializer(instance.documents.all(), many=True).data

        return data

    def get_route_name(self, obj):
        if obj.transport and obj.transport.pickup_point_id:
            pickup_obj = RoutePickupPoint.objects.filter(id=obj.transport.pickup_point_id).first()
            if pickup_obj:
                return pickup_obj.route.title if pickup_obj.route else None
            return None
        return None
    
    def get_route_id(self, obj):
        if obj.transport and obj.transport.pickup_point_id:
            pickup_obj = RoutePickupPoint.objects.filter(id=obj.transport.pickup_point_id).first()
            if pickup_obj:
                return pickup_obj.route.id if pickup_obj.route else None
            return None
        return None
    
    def create(self, validated_data):
        # Extract and remove related data
        personal_data = {field: validated_data.pop(field, '') for field in [
            'first_name', 'last_name', 'gender', 'date_of_birth', 'religion', 'caste',
            'mobile_number', 'email', 'student_photo'
        ]}

        physical_data = {field: validated_data.pop(field, None) for field in ['height', 'weight', 'blood_group', 'house']}
        vehicle = validated_data.pop('vehicle', None)
        pickup_point = validated_data.pop('pickup_point', None)
        hostel = validated_data.pop('hostel', None)
        hostel_room = validated_data.pop('hostel_room', None)

        parent_data = {
            'father_name': validated_data.pop('father_name', ''),
            'father_phone': validated_data.pop('father_phone', ''),
            'father_occupation': validated_data.pop('father_occupation', ''),
            'father_photo': validated_data.pop('father_photo',''),
            'mother_name': validated_data.pop('mother_name', ''),
            'mother_phone': validated_data.pop('mother_phone', ''), 
            'mother_occupation': validated_data.pop('mother_occupation', ''),
            'mother_photo': validated_data.pop('mother_photo',''),
        }

        guardian_data = {
            'guardian_name': validated_data.pop('guardian_name', ''),
            'guardian_relation': validated_data.pop('guardian_relation', ''),
            'guardian_type': validated_data.pop('guardian_type', ''),
            'guardian_photo': validated_data.pop('guardian_photo',''),
            'guardian_phone': validated_data.pop('guardian_phone', ''),
            'guardian_occupation': validated_data.pop('guardian_occupation', ''),
            'guardian_email': validated_data.pop('guardian_email', ''),
            'guardian_address': validated_data.pop('guardian_address', ''),
        }

        address_data = {
            'is_guardian_address_same_as_current': validated_data.pop('is_guardian_address_same_as_current', False),
            'is_permanent_same_as_current': validated_data.pop('is_permanent_same_as_current', False),
            'current_address': validated_data.pop('current_address', ''),
            'permanent_address': validated_data.pop('permanent_address', ''),
        }

        bank_data = {
            'bank_account_number': validated_data.pop('bank_account_number', ''),
            'bank_name': validated_data.pop('bank_name', ''),
            'ifsc_code': validated_data.pop('ifsc_code', ''),
            'national_id': validated_data.pop('national_id', ''),
            'local_id': validated_data.pop('local_id', ''),
            'rte': validated_data.pop('rte', 'No'),
            'previous_school_note': validated_data.pop('previous_school_note', ''),
            'note': validated_data.pop('note', ''),
        }

        fee_details = validated_data.pop('fee_details', [])
        try:
            fee_group_ids = json.loads(fee_details)
        except Exception:
            raise serializers.ValidationError("Invalid fee_details format. Must be a JSON string.")
        
        documents = validated_data.pop('documents', [])

        # Create main student record
        student = StudentAdmission.objects.create(**validated_data)
        
        # Create related records (only once)
        StudentPersonalDetail.objects.create(student=student, **personal_data)
        StudentPhysicalDetail.objects.create(student=student, **physical_data)
        StudentTransportDetail.objects.create(student=student, vehicle=vehicle, pickup_point=pickup_point)
        StudentHostelDetail.objects.create(student=student, hostel=hostel, hostel_room=hostel_room)
        StudentParentDetail.objects.create(student=student, **parent_data)
        StudentGuardianDetail.objects.create(student=student, **guardian_data)
        StudentAddressDetail.objects.create(student=student, **address_data)
        StudentBankDetail.objects.create(student=student, **bank_data)

        if fee_group_ids:
            # Fetch and group FeesMaster entries
            fees_masters = FeesMaster.objects.filter(
                fees_group_id__in=fee_group_ids,
                is_active=True,
                fees_type__is_active=True,
                fees_group__is_active=True
            ).select_related("fees_group", "fees_type")

            grouped = defaultdict(list)

            for fee in fees_masters:
                grouped[fee.fees_group.id].append(fee)

            # Save StudentFeesDetail grouped under each group/fee_type
            fees_total_amount = []
            for group_id, fee_list in grouped.items():
                for fee in fee_list:
                    StudentFeesDetail.objects.create(
                        student=student,
                        fees_group=fee.fees_group,
                        fees_type=fee.fees_type,
                        amount=fee.amount,
                        due_date=fee.due_date
                    )
                    fees_total_amount.append(fee.amount)

            student.fees_total_amount = sum(fees_total_amount)
            student.save()

        for doc in documents:
            if doc.get('document'):  # Prevent empty file records
                StudentDocument.objects.create(student=student, **doc)

        return student


class FlatStudentPartialUpdateSerializer(FlatStudentSerializer):

    class Meta(FlatStudentSerializer.Meta):
        extra_kwargs = {field: {'required': False, 'allow_null': True} for field in FlatStudentSerializer().get_fields()}

    def update(self, instance, validated_data):
        personal_data = {field: validated_data.pop(field, None) for field in [
            'first_name', 'last_name', 'gender', 'date_of_birth', 'religion', 'caste',
            'mobile_number', 'email', 'student_photo'
        ]}

        physical_data = {field: validated_data.pop(field, None) for field in ['height', 'weight', 'blood_group']}
        vehicle = validated_data.pop('vehicle', None)
        pickup_point = validated_data.pop('pickup_point', None)
        hostel = validated_data.pop('hostel', None)
        hostel_room = validated_data.pop('hostel_room', None)

        parent_data = {
            'father_name': validated_data.pop('father_name', None),
            'father_phone': validated_data.pop('father_phone', None),
            'father_occupation': validated_data.pop('father_occupation', None),
            'father_photo': validated_data.pop('father_photo', None),
            'mother_name': validated_data.pop('mother_name', None),
            'mother_phone': validated_data.pop('mother_phone', None), 
            'mother_occupation': validated_data.pop('mother_occupation', None),
            'mother_photo': validated_data.pop('mother_photo', None),
        }

        guardian_data = {
            'guardian_name': validated_data.pop('guardian_name', None),
            'guardian_relation': validated_data.pop('guardian_relation', None),
            'guardian_type': validated_data.pop('guardian_type', None),
            'guardian_photo': validated_data.pop('guardian_photo', None),
            'guardian_phone': validated_data.pop('guardian_phone', None),
            'guardian_occupation': validated_data.pop('guardian_occupation', None),
            'guardian_email': validated_data.pop('guardian_email', None),
            'guardian_address': validated_data.pop('guardian_address', None),
        }

        address_data = {
            'is_guardian_address_same_as_current': validated_data.pop('is_guardian_address_same_as_current', None),
            'is_permanent_same_as_current': validated_data.pop('is_permanent_same_as_current', None),
            'current_address': validated_data.pop('current_address', None),
            'permanent_address': validated_data.pop('permanent_address', None),
        }

        bank_data = {
            'bank_account_number': validated_data.pop('bank_account_number', None),
            'bank_name': validated_data.pop('bank_name', None),
            'ifsc_code': validated_data.pop('ifsc_code', None),
            'national_id': validated_data.pop('national_id', None),
            'local_id': validated_data.pop('local_id', None),
            'rte': validated_data.pop('rte', None),
            'previous_school_note': validated_data.pop('previous_school_note', None),
            'note': validated_data.pop('note', None),
        }

        fee_details = validated_data.pop('fee_details', None)
        if fee_details:
            try:
                fee_group_ids = json.loads(fee_details)
            except Exception:
                raise serializers.ValidationError("Invalid fee_details format. Must be a JSON string.")
        else:
            fee_group_ids = []

        documents = validated_data.pop('documents', [])

        # Update main student model
        for attr, value in validated_data.items():
            if value is not None:
                setattr(instance, attr, value)
        instance.save()

        # Update related models with only present values
        if any(value is not None for value in personal_data.values()):
            StudentPersonalDetail.objects.update_or_create(student=instance, defaults={k: v for k, v in personal_data.items() if v is not None})
        
        if any(value is not None for value in physical_data.values()):
            StudentPhysicalDetail.objects.update_or_create(student=instance, defaults={k: v for k, v in physical_data.items() if v is not None})
        
        if vehicle is not None or pickup_point is not None:
            StudentTransportDetail.objects.update_or_create(student=instance, defaults={'vehicle': vehicle, 'pickup_point': pickup_point})
        
        if hostel is not None or hostel_room is not None:
            StudentHostelDetail.objects.update_or_create(student=instance, defaults={'hostel': hostel, 'hostel_room': hostel_room})
        
        if any(value is not None for value in parent_data.values()):
            StudentParentDetail.objects.update_or_create(student=instance, defaults={k: v for k, v in parent_data.items() if v is not None})
        
        if any(value is not None for value in guardian_data.values()):
            StudentGuardianDetail.objects.update_or_create(student=instance, defaults={k: v for k, v in guardian_data.items() if v is not None})
        
        if any(value is not None for value in address_data.values()):
            StudentAddressDetail.objects.update_or_create(student=instance, defaults={k: v for k, v in address_data.items() if v is not None})
        
        if any(value is not None for value in bank_data.values()):
            StudentBankDetail.objects.update_or_create(student=instance, defaults={k: v for k, v in bank_data.items() if v is not None})

        if fee_group_ids:
            StudentFeesDetail.objects.filter(student=instance).delete()
            fees_masters = FeesMaster.objects.filter(
                fees_group_id__in=fee_group_ids,
                is_active=True,
                fees_type__is_active=True,
                fees_group__is_active=True
            ).select_related("fees_group", "fees_type")

            grouped = defaultdict(list)
            for fee in fees_masters:
                grouped[fee.fees_group.id].append(fee)

            fees_total_amount = []
            for group_id, fee_list in grouped.items():
                for fee in fee_list:
                    StudentFeesDetail.objects.create(
                        student=instance,
                        fees_group=fee.fees_group,
                        fees_type=fee.fees_type,
                        amount=fee.amount,
                        due_date=fee.due_date
                    )
                    fees_total_amount.append(fee.amount)

            instance.fees_total_amount = sum(fees_total_amount)
            instance.save()

        if documents:
            StudentDocument.objects.filter(student=instance).delete()
            for doc in documents:
                if doc.get('document'):
                    StudentDocument.objects.create(student=instance, **doc)

        return instance


