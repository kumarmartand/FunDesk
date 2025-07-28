from uuid import uuid4
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse
from rest_framework.generics import get_object_or_404
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import Route, Vehicle, PickupPoint, RouteVehicle, RoutePickupPoint
from .serializers import (
    RouteSerializer, VehicleSerializer,
    PickupPointSerializer, RouteVehicleSerializer, RoutePickupPointSerializer
)
from .views import BaseViewSet

common_post_request_body = {
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
}

# Route ViewSet
@extend_schema_view(
    post=extend_schema(
        tags=['Route'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "title": "Route 1"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['Route']),
    create=extend_schema(tags=['Route']),
    update=extend_schema(tags=['Route']),
    partial_update=extend_schema(tags=['Route']),
    destroy=extend_schema(tags=['Route']),
)
class RouteViewSet(BaseViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer

    def get_required_fields(self):
        return ['title']

    def get_search_fields(self):
        return ['title']

    @extend_schema(
        methods=["GET"],
        tags=["Route"],
        description="Get all routes without pagination or filters.",
        responses={
            200: OpenApiResponse(
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Success"},
                        "status": {"type": "integer", "example": 200},
                        "data": {
                            "type": "array",
                            "items": {"type": "object"},
                            "example": [{"id": 1, "title": "Route 1"}]
                        },
                        "count": {"type": "integer", "example": 1}
                    }
                }
            )
        }
    )
    @action(detail=False, methods=["get"], url_path="all")
    def get_all(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data,
            "count": queryset.count()
        }, status=status.HTTP_200_OK)


# Vehicle ViewSet
@extend_schema_view(
    post=extend_schema(
        tags=['Vehicle'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "vehicle_number": "AB1234"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['Vehicle']),
    create=extend_schema(tags=['Vehicle']),
    update=extend_schema(tags=['Vehicle']),
    partial_update=extend_schema(tags=['Vehicle']),
    destroy=extend_schema(tags=['Vehicle']),
)

class VehicleViewSet(BaseViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # ⬅️ For file uploads
    
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=self.kwargs.get('pk'))
        return obj

    def get_required_fields(self):
        return ['vehicle_number', 'vehicle_model']

    def get_search_fields(self):
        return ['vehicle_number', 'vehicle_model']

    def save_file(self, file):
        # Validate image
        if not file.content_type.startswith('image/'):
            raise ValueError("Only image files are allowed.")
        if file.size > 5 * 1024 * 1024:  # 5MB limit
            raise ValueError("Image file too large (max 5MB).")

        # Save file
        ext = file.name.split('.')[-1]
        unique_name = f"{uuid4().hex}.{ext}"
        file_path = os.path.join('vehicles', unique_name)
        saved_path = default_storage.save(file_path, ContentFile(file.read()))
        return saved_path

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        file = request.FILES.get('vehicle_photo')
        try:
            if file:
                saved_path = self.save_file(file)
                data['vehicle_photo'] = saved_path  # Save relative path in DB

            serializer = VehicleSerializer(data=data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({
                "data": serializer.data,
                "message": "Success",
                "status": status.HTTP_201_CREATED,
            })

        except ValueError as e:
            return Response({
                "message": "Validation failed",
                "errors": {
                    "vehicle_photo": [str(e)]
                },
                "status": status.HTTP_400_BAD_REQUEST,
            })

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        file = request.FILES.get('vehicle_photo')
        try:
            if file:
                saved_path = self.save_file(file)
                data['vehicle_photo'] = saved_path  # Save relative path

            serializer = VehicleSerializer(instance, data=data, partial=True, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({
                "data": serializer.data,
                "message": "Success",
                "status": status.HTTP_200_OK,
            })
        except ValueError as e:
            return Response({
                "message": "Validation failed",
                "errors": {
                    "vehicle_photo": [str(e)]
                },
                "status": status.HTTP_400_BAD_REQUEST,
            })

    @extend_schema(
        methods=["GET"],
        tags=["Vehicle"],
        description="Get all vehicles without pagination or filters.",
        responses={
            200: OpenApiResponse(
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Success"},
                        "status": {"type": "integer", "example": 200},
                        "data": {
                            "type": "array",
                            "items": {"type": "object"},
                            "example": [{"id": 1, "vehicle_number": "AB1234"}]
                        },
                        "count": {"type": "integer", "example": 1}
                    }
                }
            )
        }
    )
    @action(detail=False, methods=["get"], url_path="all")
    def get_all(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data,
            "count": queryset.count()
        }, status=status.HTTP_200_OK)

# PickupPoint ViewSet
@extend_schema_view(
    post=extend_schema(
        tags=['PickupPoint'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "pickup_point": "Main Gate"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['PickupPoint']),
    create=extend_schema(tags=['PickupPoint']),
    update=extend_schema(tags=['PickupPoint']),
    partial_update=extend_schema(tags=['PickupPoint']),
    destroy=extend_schema(tags=['PickupPoint']),
)
class PickupPointViewSet(BaseViewSet):
    queryset = PickupPoint.objects.all()
    serializer_class = PickupPointSerializer

    def get_required_fields(self):
        return ['pickup_point', 'latitude', 'longitude']

    def get_search_fields(self):
        return ['pickup_point']

    @extend_schema(
        methods=["GET"],
        tags=["PickupPoint"],
        description="Get all pickup points without pagination or filters.",
        responses={
            200: OpenApiResponse(
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Success"},
                        "status": {"type": "integer", "example": 200},
                        "data": {
                            "type": "array",
                            "items": {"type": "object"},
                            "example": [{"id": 1, "pickup_point": "Main Gate"}]
                        },
                        "count": {"type": "integer", "example": 1}
                    }
                }
            )
        }
    )
    @action(detail=False, methods=["get"], url_path="all")
    def get_all(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data,
            "count": queryset.count()
        }, status=status.HTTP_200_OK)


# RouteVehicle ViewSet
@extend_schema_view(
    post=extend_schema(
        tags=['RouteVehicle'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "route": 1}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['RouteVehicle']),
    create=extend_schema(tags=['RouteVehicle']),
    update=extend_schema(tags=['RouteVehicle']),
    partial_update=extend_schema(tags=['RouteVehicle']),
    destroy=extend_schema(tags=['RouteVehicle']),
)
class RouteVehicleViewSet(BaseViewSet):
    queryset = RouteVehicle.objects.all()
    serializer_class = RouteVehicleSerializer

    def get_required_fields(self):
        return ['route', 'vehicles']

    def get_search_fields(self):
        return ['route__title']

    @extend_schema(
        methods=["GET"],
        tags=["RouteVehicle"],
        description="Get all route vehicles without pagination or filters.",
        responses={
            200: OpenApiResponse(
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Success"},
                        "status": {"type": "integer", "example": 200},
                        "data": {
                            "type": "array",
                            "items": {"type": "object"},
                            "example": [{"id": 1, "route": 1}]
                        },
                        "count": {"type": "integer", "example": 1}
                    }
                }
            )
        }
    )
    @action(detail=False, methods=["get"], url_path="all")
    def get_all(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data,
            "count": queryset.count()
        }, status=status.HTTP_200_OK)


# RoutePickupPoint ViewSet
@extend_schema_view(
    post=extend_schema(
        tags=['RoutePickupPoint'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "route": 1, "pickup_point": 1}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['RoutePickupPoint']),
    create=extend_schema(tags=['RoutePickupPoint']),
    update=extend_schema(tags=['RoutePickupPoint']),
    partial_update=extend_schema(tags=['RoutePickupPoint']),
    destroy=extend_schema(tags=['RoutePickupPoint']),
)
class RoutePickupPointViewSet(BaseViewSet):
    queryset = RoutePickupPoint.objects.all()
    serializer_class = RoutePickupPointSerializer

    def get_required_fields(self):
        return ['route', 'pickup_point', 'distance', 'pickup_time', 'monthly_fees']

    def get_search_fields(self):
        return ['route__title', 'pickup_point__pickup_point']

    @extend_schema(
        methods=["GET"],
        tags=["RoutePickupPoint"],
        description="Get all route pickup points without pagination or filters.",
        responses={
            200: OpenApiResponse(
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Success"},
                        "status": {"type": "integer", "example": 200},
                        "data": {
                            "type": "array",
                            "items": {"type": "object"},
                            "example": [{"id": 1, "route": 1, "pickup_point": 1}]
                        },
                        "count": {"type": "integer", "example": 1}
                    }
                }
            )
        }
    )
    @action(detail=False, methods=["get"], url_path="all")
    def get_all(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data,
            "count": queryset.count()
        }, status=status.HTTP_200_OK)
