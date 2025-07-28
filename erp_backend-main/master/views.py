from collections import defaultdict
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from django.db.models import Q
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiResponse, OpenApiExample, OpenApiTypes
from .models import (
    SchoolClass, Section, CasteCategory, SchoolSession,
    FeesTypeMaster, FeesGroup, FeesMaster, FeesDiscount,
    RoomType, Hostel, HostelRoom, Route, Vehicle,
    PickupPoint, RouteVehicle, RoutePickupPoint
)
from .serializers import (
    ClassSerializer, SectionSerializer, CasteCategorySerializer, SchoolSessionSerializer,
    FeesTypeMasterSerializer, FeesGroupSerializer, FeesMasterSerializer, FeesDiscountSerializer,
    RoomTypeSerializer, HostelSerializer, HostelRoomSerializer,
    RouteSerializer, VehicleSerializer, PickupPointSerializer,
    RouteVehicleSerializer, RoutePickupPointSerializer
)
from student.models import House
from student.serializers import HouseSerializer
from math import ceil
from base.views import BaseViewSet

# Common Swagger parameters for POST requests
common_list_parameters = [
    OpenApiParameter("page", OpenApiTypes.INT, description="Page number", location=OpenApiParameter.QUERY, required=False, examples=[OpenApiExample(name="default", value=1)]),
    OpenApiParameter("pageSize", OpenApiTypes.INT, description="Max items per page", location=OpenApiParameter.QUERY, required=False, examples=[OpenApiExample(name="default", value=10)]),
    OpenApiParameter("order_by_field", OpenApiTypes.STR, description="Field to order by", location=OpenApiParameter.QUERY, required=False, examples=[OpenApiExample(name="default", value="id")]),
    OpenApiParameter("order_by_value", OpenApiTypes.STR, description="Ordering direction: asc or desc", location=OpenApiParameter.QUERY, required=False, examples=[OpenApiExample(name="default", value="desc")]),
    OpenApiParameter("search_text", OpenApiTypes.STR, description="Search text", location=OpenApiParameter.QUERY, required=False, examples=[OpenApiExample(name="default", value="")]),
]

@extend_schema_view(
    post=extend_schema(
        tags=['Classes'],
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "page": {"type": "integer", "example": 1},
                    "pageSize": {"type": "integer", "example": 10},
                    "order_by_field": {"type": "string", "example": "id"},
                    "order_by_value": {"type": "string", "example": "desc"},
                    "search_text": {"type": "string", "example": ""},
                },
                "required": [],
            }
        },
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "Class 1"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['Classes']),
    create=extend_schema(tags=['Classes']),
    update=extend_schema(tags=['Classes']),
    partial_update=extend_schema(tags=['Classes']),
    destroy=extend_schema(tags=['Classes']),
)
class ClassViewSet(BaseViewSet):
    queryset = SchoolClass.objects
    serializer_class = ClassSerializer

    def get_required_fields(self):
        return ['name']
    
    def get_search_fields(self):
        return ['name']

    @extend_schema(
        methods=["GET"],
        tags=["Classes"],
        description="Get all class records without pagination or filters.",
        responses={
            200: OpenApiResponse(
                description="All classes without pagination",
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Success"},
                        "status": {"type": "integer", "example": 200},
                        "data": {
                            "type": "array",
                            "items": {"type": "object"},
                            "example": [{"id": 1, "name": "Class 1"}, {"id": 2, "name": "Class 2"}]
                        },
                        "count": {"type": "integer", "example": 2}
                    }
                }
            )
        }
    )
    @action(detail=False, methods=["get"], url_path="all", permission_classes=[IsAuthenticated])
    def get_all(self, request):
        """
        Return all class records without pagination or filters.
        """
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    

@extend_schema_view(
    post=extend_schema(
        tags=['Sections'],
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "page": {"type": "integer", "example": 1},
                    "pageSize": {"type": "integer", "example": 10},
                    "order_by_field": {"type": "string", "example": "id"},
                    "order_by_value": {"type": "string", "example": "desc"},
                    "search_text": {"type": "string", "example": ""},
                },
                "required": [],
            }
        },
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "Section A"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['Sections']),
    create=extend_schema(tags=['Sections']),
    update=extend_schema(tags=['Sections']),
    partial_update=extend_schema(tags=['Sections']),
    destroy=extend_schema(tags=['Sections']),
)
class SectionViewSet(BaseViewSet):
    queryset = Section.objects
    serializer_class = SectionSerializer

    def get_required_fields(self):
        return ['name']
    
    def get_search_fields(self):
        return ['name']


@extend_schema_view(
    post=extend_schema(
        tags=['CasteCategories'],
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "page": {"type": "integer", "example": 1},
                    "pageSize": {"type": "integer", "example": 10},
                    "order_by_field": {"type": "string", "example": "id"},
                    "order_by_value": {"type": "string", "example": "desc"},
                    "search_text": {"type": "string", "example": ""},
                },
                "required": [],
            }
        },
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "OBC"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['CasteCategories']),
    create=extend_schema(tags=['CasteCategories']),
    update=extend_schema(tags=['CasteCategories']),
    partial_update=extend_schema(tags=['CasteCategories']),
    destroy=extend_schema(tags=['CasteCategories']),
)
class CasteCategoryViewSet(BaseViewSet):
    queryset = CasteCategory.objects
    serializer_class = CasteCategorySerializer

    def get_required_fields(self):
        return ['name']
    
    def get_search_fields(self):
        return ['name']


@extend_schema_view(
    post=extend_schema(
        tags=['SchoolSessions'],
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "page": {"type": "integer", "example": 1},
                    "pageSize": {"type": "integer", "example": 10},
                    "order_by_field": {"type": "string", "example": "id"},
                    "order_by_value": {"type": "string", "example": "desc"},
                    "search_text": {"type": "string", "example": ""},
                },
                "required": [],
            }
        },
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "Session 2024-2025"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['SchoolSessions']),
    create=extend_schema(tags=['SchoolSessions']),
    update=extend_schema(tags=['SchoolSessions']),
    partial_update=extend_schema(tags=['SchoolSessions']),
    destroy=extend_schema(tags=['SchoolSessions']),
)
class SchoolSessionViewSet(BaseViewSet):
    queryset = SchoolSession.objects
    serializer_class = SchoolSessionSerializer

    def get_required_fields(self):
        return ['name']
    
    def get_search_fields(self):
        return ['name']


@extend_schema(
    tags=["Masters"],
    summary="Get All Masters Data",
    description="Returns all master data from Fees, Hostel, and Transport modules in a single response.",
    responses={
        200: OpenApiResponse(
            description="Success Response",
            response={
                "type": "object",
                "properties": {
                    "message": {"type": "string", "example": "Success"},
                    "status": {"type": "integer", "example": 200},
                    "data": {"type": "object"},
                }
            }
        )
    }
)
class AllMastersAPIView(APIView):
    authentication_classes = [JWTAuthentication]  
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Group FeesMaster by FeesGroup
        grouped_fees = defaultdict(list)

        # Fetch all FeesMaster entries with select_related for optimization
        total_amount = []
        for fee in FeesMaster.objects.select_related('fees_group', 'fees_type').all():
            group_id = fee.fees_group.id
            
            grouped_fees[group_id].append({
                "fees_type_id": fee.fees_type.id,
                "fees_type_name": fee.fees_type.name,
                "fees_code": fee.fees_type.fees_code,
                "description": fee.fees_type.description,
                "due_date": fee.due_date,
                "amount": fee.amount,
                "fine_type": fee.fine_type,
                "percentage": fee.percentage,
                "fix_amount": fee.fix_amount,
                "is_active": fee.is_active,
            })
            total_amount.append(fee.amount)

        # Build the final grouped data
        fees_master_grouped = []
        for group in FeesGroup.objects.all():
            fees_master_grouped.append({
                "group_id": group.id,
                "group_name": group.name,
                "description": group.description,
                "is_active": group.is_active,
                "fees_types": grouped_fees.get(group.id, []),
                "amount": sum(total_amount) if total_amount else 0,
            })

        data = {
            "houses": HouseSerializer(House.objects.all(), many=True).data,
            "fees_types": FeesTypeMasterSerializer(FeesTypeMaster.objects.all(), many=True).data,
            "fees_groups": FeesGroupSerializer(FeesGroup.objects.all(), many=True).data,
            "fees_master": fees_master_grouped,
            "fees_discounts": FeesDiscountSerializer(FeesDiscount.objects.all(), many=True).data,
            
            "room_types": RoomTypeSerializer(RoomType.objects.all(), many=True).data,
            "hostels": HostelSerializer(Hostel.objects.all(), many=True).data,
            "hostel_rooms": HostelRoomSerializer(HostelRoom.objects.all(), many=True).data,
            
            "routes": RouteSerializer(Route.objects.all(), many=True).data,
            "vehicles": VehicleSerializer(Vehicle.objects.all(), many=True).data,
            "pickup_points": PickupPointSerializer(PickupPoint.objects.all(), many=True).data,
            "route_vehicles": RouteVehicleSerializer(RouteVehicle.objects.all(), many=True).data,
            "route_pickup_points": RoutePickupPointSerializer(RoutePickupPoint.objects.all(), many=True).data,
            "classes": ClassSerializer(SchoolClass.objects.all(), many=True).data,
            "sections": SectionSerializer(Section.objects.all(), many=True).data,
            
        }

        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": data
        }, status=status.HTTP_200_OK)