from django.contrib import admin
from .models import (
    House, StudentAdmission, StudentPersonalDetail, StudentPhysicalDetail,
    StudentTransportDetail, StudentHostelDetail, StudentFeesDetail,
    StudentParentDetail, StudentGuardianDetail, StudentAddressDetail,
    StudentBankDetail, StudentDocument
)


@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active']
    search_fields = ['name']
    list_filter = ['is_active']


@admin.register(StudentAdmission)
class StudentAdmissionAdmin(admin.ModelAdmin):
    list_display = ['roll_number', 'school_class', 'section', 'admission_date', 'caste_category', 'house']
    search_fields = ['roll_number']
    list_filter = ['school_class', 'section', 'caste_category', 'house']


@admin.register(StudentPersonalDetail)
class StudentPersonalDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'first_name', 'last_name', 'gender', 'date_of_birth']
    search_fields = ['first_name', 'last_name']
    list_filter = ['gender']


@admin.register(StudentPhysicalDetail)
class StudentPhysicalDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'blood_group', 'height', 'weight', 'measurement_date']
    list_filter = ['blood_group']


@admin.register(StudentTransportDetail)
class StudentTransportDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'vehicle', 'pickup_point', 'fees_month']
    list_filter = ['vehicle', 'pickup_point']


@admin.register(StudentHostelDetail)
class StudentHostelDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'hostel', 'hostel_room', 'bed_number', 'allocation_date', 'cost_per_bed']
    list_filter = ['hostel', 'hostel_room']


@admin.register(StudentFeesDetail)
class StudentFeesDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'fees_group', 'fees_type', 'amount', 'paid', 'discount', 'due_date']
    list_filter = ['fees_group', 'fees_type']
    search_fields = ['student__roll_number']


@admin.register(StudentParentDetail)
class StudentParentDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'father_name', 'mother_name']


@admin.register(StudentGuardianDetail)
class StudentGuardianDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'guardian_type', 'guardian_name', 'guardian_phone']


@admin.register(StudentAddressDetail)
class StudentAddressDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'is_guardian_address_same_as_current', 'is_permanent_same_as_current']


@admin.register(StudentBankDetail)
class StudentBankDetailAdmin(admin.ModelAdmin):
    list_display = ['student', 'bank_account_number', 'bank_name', 'ifsc_code', 'rte']


@admin.register(StudentDocument)
class StudentDocumentAdmin(admin.ModelAdmin):
    list_display = ['student', 'title', 'document']
    search_fields = ['title', 'student__roll_number']
