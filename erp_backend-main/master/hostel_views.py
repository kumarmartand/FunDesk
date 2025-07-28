from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse
from .models import RoomType, Hostel, HostelRoom
from .serializers import RoomTypeSerializer, HostelSerializer, HostelRoomSerializer
from base.views import BaseViewSet  # Assuming you have a common BaseViewSet

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

# ==== RoomType ViewSet ====
@extend_schema_view(
    post=extend_schema(
        tags=['RoomType'],
        request=common_post_request_body,
        responses={200: OpenApiResponse(
            response={"message": "Success", "status": 200, "data": [{"id": 1, "room_type": "Single"}], "meta": {"count": 1}}
        )}
    ),
    retrieve=extend_schema(tags=['RoomType']),
    create=extend_schema(tags=['RoomType']),
    update=extend_schema(tags=['RoomType']),
    partial_update=extend_schema(tags=['RoomType']),
    destroy=extend_schema(tags=['RoomType']),
)
class RoomTypeViewSet(BaseViewSet):
    queryset = RoomType.objects
    serializer_class = RoomTypeSerializer

    def get_required_fields(self):
        return ['room_type']

    def get_search_fields(self):
        return ['room_type']

    @extend_schema(
        methods=["GET"],
        tags=["RoomType"],
        description="Get all room types.",
        responses={200: OpenApiResponse(response={
            "message": "Success", "status": 200, "data": [{"id": 1, "room_type": "Single"}], "count": 1
        })}
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
        })


# ==== Hostel ViewSet ====
@extend_schema_view(
    post=extend_schema(
        tags=['Hostel'],
        request=common_post_request_body,
        responses={200: OpenApiResponse(
            response={"message": "Success", "status": 200, "data": [{"id": 1, "name": "A Block"}], "meta": {"count": 1}}
        )}
    ),
    retrieve=extend_schema(tags=['Hostel']),
    create=extend_schema(tags=['Hostel']),
    update=extend_schema(tags=['Hostel']),
    partial_update=extend_schema(tags=['Hostel']),
    destroy=extend_schema(tags=['Hostel']),
)
class HostelViewSet(BaseViewSet):
    queryset = Hostel.objects
    serializer_class = HostelSerializer

    def get_required_fields(self):
        return ['name', 'hostel_type', 'address', 'intake']

    def get_search_fields(self):
        return ['name', 'hostel_type', 'address']

    @extend_schema(
        methods=["GET"],
        tags=["Hostel"],
        description="Get all hostels.",
        responses={200: OpenApiResponse(response={
            "message": "Success", "status": 200, "data": [{"id": 1, "name": "A Block"}], "count": 1
        })}
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
        })


# ==== HostelRoom ViewSet ====
@extend_schema_view(
    post=extend_schema(
        tags=['HostelRoom'],
        request=common_post_request_body,
        responses={200: OpenApiResponse(
            response={"message": "Success", "status": 200, "data": [{"id": 1, "room_no": "101"}], "meta": {"count": 1}}
        )}
    ),
    retrieve=extend_schema(tags=['HostelRoom']),
    create=extend_schema(tags=['HostelRoom']),
    update=extend_schema(tags=['HostelRoom']),
    partial_update=extend_schema(tags=['HostelRoom']),
    destroy=extend_schema(tags=['HostelRoom']),
)
class HostelRoomViewSet(BaseViewSet):
    queryset = HostelRoom.objects
    serializer_class = HostelRoomSerializer

    def get_required_fields(self):
        return ['room_no', 'hostel', 'room_type', 'number_of_beds', 'cost_per_bed']

    def get_search_fields(self):
        return ['room_no', 'hostel__name', 'room_type__room_type']

    @extend_schema(
        methods=["GET"],
        tags=["HostelRoom"],
        description="Get all hostel rooms.",
        responses={200: OpenApiResponse(response={
            "message": "Success", "status": 200, "data": [{"id": 1, "room_no": "101"}], "count": 1
        })}
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
        })
