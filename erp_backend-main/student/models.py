from django.db import models
from django.core.validators import FileExtensionValidator
from datetime import date
from master.models import (
    SchoolClass, Section, CasteCategory, SchoolSession,
    Route, PickupPoint, Hostel, HostelRoom, FeesGroup, FeesTypeMaster,
    Vehicle, RoutePickupPoint

)

# ---------------------
# Choice Constants
# ---------------------
GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
BLOOD_GROUPS = [('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
                ('O+', 'O+'), ('O-', 'O-'), ('AB+', 'AB+'), ('AB-', 'AB-')]
GUARDIAN_TYPE_CHOICES = [('Father', 'Father'), ('Mother', 'Mother'), ('Other', 'Other')]
RTE_CHOICES = [('Yes', 'Yes'), ('No', 'No')]
MONTH_CHOICES = [(str(i), date(1900, i, 1).strftime('%B')) for i in range(1, 13)]

# ---------------------
# House Model
# ---------------------
class House(models.Model):
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
# ---------------------
# Main Student Model
# ---------------------
class StudentAdmission(models.Model):
    roll_number = models.CharField(max_length=20, unique=True)
    school_class = models.ForeignKey(SchoolClass, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    admission_date = models.DateField(default=date.today)
    caste_category = models.CharField(max_length=222, blank=True, null=True)
    house = models.ForeignKey(House, on_delete=models.SET_NULL, null=True, blank=True)
    fees_total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.roll_number}"

# ---------------------
# Personal Details
# ---------------------
class StudentPersonalDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='personal')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    religion = models.CharField(max_length=100, null=True, blank=True)
    caste = models.CharField(max_length=100, null=True, blank=True)
    mobile_number = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    student_photo = models.CharField(max_length=100, blank=True, null=True)

# ---------------------
# Physical Details
# ---------------------
class StudentPhysicalDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='physical')
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUPS, null=True, blank=True)
    house = models.ForeignKey(House, on_delete=models.SET_NULL, null=True, blank=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    measurement_date = models.DateField(default=date.today)

# ---------------------
# Transport Details
# ---------------------
class StudentTransportDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='transport')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
    pickup_point = models.ForeignKey(RoutePickupPoint, on_delete=models.SET_NULL, null=True, blank=True)
    fees_month = models.CharField(max_length=2, choices=MONTH_CHOICES, null=True, blank=True)

# ---------------------
# Hostel Details
# ---------------------
class StudentHostelDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='hostel')
    hostel = models.ForeignKey(Hostel, on_delete=models.SET_NULL, null=True, blank=True)
    hostel_room = models.ForeignKey(HostelRoom, on_delete=models.SET_NULL, null=True, blank=True)
    bed_number = models.CharField(max_length=10, blank=True, null=True)
    allocation_date = models.DateField(auto_now_add=True)
    cost_per_bed = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

# ---------------------
# Fees Details
# ---------------------
class StudentFeesDetail(models.Model):
    student = models.ForeignKey(StudentAdmission, on_delete=models.CASCADE, related_name='fee_details')
    fees_group = models.ForeignKey(FeesGroup, on_delete=models.CASCADE)
    fees_type = models.ForeignKey(FeesTypeMaster, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # actual charged amount
    paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    due_date = models.DateField(null=True, blank=True)
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('student', 'fees_group', 'fees_type')

    def __str__(self):
        return f"{self.student} - {self.fees_group.name} - {self.fees_type.name}"


# ---------------------
# Parent Details
# ---------------------
class StudentParentDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='parents')
    father_name = models.CharField(max_length=100, null=True, blank=True)
    father_phone = models.CharField(max_length=15, null=True, blank=True)
    father_occupation = models.CharField(max_length=100, null=True, blank=True)
    father_photo = models.CharField(max_length=100, blank=True, null=True)

    mother_name = models.CharField(max_length=100, null=True, blank=True)
    mother_phone = models.CharField(max_length=15, null=True, blank=True)
    mother_occupation = models.CharField(max_length=100, null=True, blank=True)
    mother_photo = models.CharField(max_length=100, blank=True, null=True)

# ---------------------
# Guardian Detail
# ---------------------
class StudentGuardianDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='guardian')
    guardian_type = models.CharField(max_length=10, choices=GUARDIAN_TYPE_CHOICES)
    guardian_name = models.CharField(max_length=100, null=True, blank=True)
    guardian_relation = models.CharField(max_length=50, null=True, blank=True)
    guardian_phone = models.CharField(max_length=15, null=True, blank=True)
    guardian_occupation = models.CharField(max_length=100, null=True, blank=True)
    guardian_email = models.EmailField(null=True, blank=True)
    guardian_photo = models.CharField(max_length=100, blank=True, null=True)
    guardian_address = models.TextField(null=True, blank=True)

# ---------------------
# Address Detail
# ---------------------
class StudentAddressDetail(models.Model):
    student = models.OneToOneField('StudentAdmission', on_delete=models.CASCADE, related_name='address')
    
    # Address fields
    current_address = models.TextField(null=True, blank=True)
    permanent_address = models.TextField(null=True, blank=True)
    
    # Address relationship flags
    is_guardian_address_same_as_current = models.BooleanField(default=False)
    is_permanent_same_as_current = models.BooleanField(default=False)

    def __str__(self):
        return f"Address of {self.student}"

# ---------------------
# Bank Detail
# ---------------------
class StudentBankDetail(models.Model):
    student = models.OneToOneField(StudentAdmission, on_delete=models.CASCADE, related_name='bank')
    bank_account_number = models.CharField(max_length=30, null=True, blank=True)
    bank_name = models.CharField(max_length=100, null=True, blank=True)
    ifsc_code = models.CharField(max_length=20, null=True, blank=True)
    national_id = models.CharField(max_length=50, null=True, blank=True)
    local_id = models.CharField(max_length=50, null=True, blank=True)
    rte = models.CharField(max_length=5, choices=RTE_CHOICES, default='No')
    previous_school_note = models.TextField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)

# ---------------------
# Documents
# ---------------------
class StudentDocument(models.Model):
    student = models.ForeignKey(StudentAdmission, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255)
    document = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.student.roll_number}"
