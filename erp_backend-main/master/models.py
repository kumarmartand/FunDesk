from django.db import models

class SchoolSession(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., "2024–2025"
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)  # Only one active session at a time

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-start_date']

class SchoolClass(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Section(models.Model):
    name = models.CharField(max_length=100)
    class_id = models.ForeignKey(SchoolClass, on_delete=models.CASCADE, related_name="sections")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.get_class_name()}"

    def get_class_name(self):
        return self.class_id.name

class CasteCategory(models.Model):
    """Represents caste categories like General, SC, ST, OBC, etc."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

#fees modules
class FeesTypeMaster(models.Model):
    name = models.CharField(max_length=100)
    fees_code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class FeesGroup(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class FeesMaster(models.Model):
    FINE_CHOICES = (
        ('None', 'None'),
        ('Percentage', 'Percentage'),
        ('Fix', 'Fix'),
    )
    fees_group = models.ForeignKey(FeesGroup, on_delete=models.CASCADE)
    fees_type = models.ForeignKey(FeesTypeMaster, on_delete=models.CASCADE)
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    fine_type = models.CharField(max_length=20, choices=FINE_CHOICES, default='None')
    percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    fix_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_active = models.BooleanField(default=True)

class FeesDiscount(models.Model):
    DISCOUNT_CHOICES = (
        ('Percentage', 'Percentage'),
        ('Fix', 'Fix'),
    )
    name = models.CharField(max_length=100)
    discount_code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_CHOICES)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    description = models.TextField(blank=True)    
    is_active = models.BooleanField(default=True)

# end fees modules    
#transportation module
class Route(models.Model):
    title = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class Vehicle(models.Model):
    vehicle_number = models.CharField(max_length=50)
    vehicle_model = models.CharField(max_length=100)
    year_made = models.PositiveIntegerField()
    registration_number = models.CharField(max_length=100)
    chasis_number = models.CharField(max_length=100)
    max_seating_capacity = models.PositiveIntegerField()
    driver_name = models.CharField(max_length=255)
    driver_licence = models.CharField(max_length=100)
    driver_contact_no = models.CharField(max_length=15)
    vehicle_photo = models.CharField(max_length=100, blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.vehicle_number

class PickupPoint(models.Model):
    pickup_point = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.pickup_point

class RouteVehicle(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    vehicles = models.ManyToManyField(Vehicle)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Route: {self.route.title}"

class RoutePickupPoint(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    pickup_point = models.ForeignKey(PickupPoint, on_delete=models.CASCADE)
    distance = models.DecimalField(max_digits=6, decimal_places=2)  # in km
    pickup_time = models.TimeField()
    monthly_fees = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.route.title} - {self.pickup_point.pickup_point}"
#end transportation module   
# start hostel module 
class RoomType(models.Model):
    room_type = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.room_type

class Hostel(models.Model):
    HOSTEL_TYPE_CHOICES = [
        ('Girls', 'Girls'),
        ('Boys', 'Boys'),
        ('Combine', 'Combine'),
    ]

    name = models.CharField(max_length=255)
    hostel_type = models.CharField(max_length=10, choices=HOSTEL_TYPE_CHOICES)
    address = models.TextField()
    intake = models.PositiveIntegerField()
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class HostelRoom(models.Model):
    room_no = models.CharField(max_length=50)
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='rooms')
    room_type = models.ForeignKey(RoomType, on_delete=models.PROTECT)
    number_of_beds = models.PositiveIntegerField()
    cost_per_bed = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.room_no} - {self.hostel.name}"

#end hostel module