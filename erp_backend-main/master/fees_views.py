from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse
from .models import FeesTypeMaster, FeesGroup, FeesMaster, FeesDiscount
from .serializers import (
    FeesTypeMasterSerializer, FeesGroupSerializer,
    FeesMasterSerializer, FeesDiscountSerializer
)
from base.views import BaseViewSet

# ===== Common Swagger request body structure =====
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

# ===== FeesType ViewSet =====
@extend_schema_view(
    post=extend_schema(
        tags=['FeesType'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "Tuition", "fees_code": "T01"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['FeesType']),
    create=extend_schema(tags=['FeesType']),
    update=extend_schema(tags=['FeesType']),
    partial_update=extend_schema(tags=['FeesType']),
    destroy=extend_schema(tags=['FeesType']),
)
class FeesTypeMasterViewSet(BaseViewSet):
    queryset = FeesTypeMaster.objects
    serializer_class = FeesTypeMasterSerializer

    def get_required_fields(self):
        return ['name', 'fees_code']

    def get_search_fields(self):
        return ['name', 'fees_code']

    @extend_schema(
        methods=["GET"],
        tags=["FeesType"],
        description="Get all fees types without pagination or filters.",
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
                            "example": [{"id": 1, "name": "Tuition", "fees_code": "T01"}]
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

# ===== FeesGroup ViewSet =====
@extend_schema_view(
    post=extend_schema(
        tags=['FeesGroup'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "Term 1"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['FeesGroup']),
    create=extend_schema(tags=['FeesGroup']),
    update=extend_schema(tags=['FeesGroup']),
    partial_update=extend_schema(tags=['FeesGroup']),
    destroy=extend_schema(tags=['FeesGroup']),
)
class FeesGroupViewSet(BaseViewSet):
    queryset = FeesGroup.objects
    serializer_class = FeesGroupSerializer

    def get_required_fields(self):
        return ['name']

    def get_search_fields(self):
        return ['name']

    @extend_schema(
        methods=["GET"],
        tags=["FeesGroup"],
        description="Get all fees groups without pagination or filters.",
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
                            "example": [{"id": 1, "name": "Term 1"}]
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

# ===== FeesMaster ViewSet =====
@extend_schema_view(
    post=extend_schema(
        tags=['FeesMaster'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "amount": 500, "fees_group": 1, "fees_type": 2}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['FeesMaster']),
    create=extend_schema(tags=['FeesMaster']),
    update=extend_schema(tags=['FeesMaster']),
    partial_update=extend_schema(tags=['FeesMaster']),
    destroy=extend_schema(tags=['FeesMaster']),
)
class FeesMasterViewSet(BaseViewSet):
    queryset = FeesMaster.objects
    serializer_class = FeesMasterSerializer

    def get_required_fields(self):
        return ['fees_group', 'fees_type', 'due_date', 'amount', 'fine_type']

    def get_search_fields(self):
        return ['fees_group__name', 'fees_type__name']

    @extend_schema(
        methods=["GET"],
        tags=["FeesMaster"],
        description="Get all fees master entries without pagination or filters.",
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
                            "example": [{"id": 1, "amount": 500}]
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

# ===== FeesDiscount ViewSet =====
@extend_schema_view(
    post=extend_schema(
        tags=['FeesDiscount'],
        request=common_post_request_body,
        responses={
            200: OpenApiResponse(
                response={
                    "message": "Success",
                    "status": 200,
                    "data": [{"id": 1, "name": "Sibling Discount", "discount_code": "D01"}],
                    "meta": {"count": 1},
                }
            )
        }
    ),
    retrieve=extend_schema(tags=['FeesDiscount']),
    create=extend_schema(tags=['FeesDiscount']),
    update=extend_schema(tags=['FeesDiscount']),
    partial_update=extend_schema(tags=['FeesDiscount']),
    destroy=extend_schema(tags=['FeesDiscount']),
)
class FeesDiscountViewSet(BaseViewSet):
    queryset = FeesDiscount.objects
    serializer_class = FeesDiscountSerializer

    def get_required_fields(self):
        return ['name', 'discount_code', 'discount_type']

    def get_search_fields(self):
        return ['name', 'discount_code']

    @extend_schema(
        methods=["GET"],
        tags=["FeesDiscount"],
        description="Get all fees discounts without pagination or filters.",
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
                            "example": [{"id": 1, "name": "Sibling Discount", "discount_code": "D01"}]
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
