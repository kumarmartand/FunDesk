from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import get_object_or_404
from django.db.models import Q
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiResponse, OpenApiExample, OpenApiTypes
from math import ceil

class CustomPagination(PageNumberPagination):
    page_size_query_param = 'pageSize'
    page_query_param = 'page'
    max_page_size = 100

class BaseViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]  
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
    pagination_class = CustomPagination
    serializer_class = None
    queryset = None

    def get_object(self):
        queryset = self.get_queryset()
        lookup_field = getattr(self, 'lookup_field', 'pk')
        lookup_url_kwarg = getattr(self, 'lookup_url_kwarg', lookup_field)

        lookup_value = self.kwargs.get(lookup_url_kwarg)
        assert lookup_value is not None, "Expected URL keyword argument for lookup."

        filter_kwargs = {lookup_field: lookup_value}
        return get_object_or_404(queryset, **filter_kwargs)
    
    def get_required_fields(self):
        return []

    def get_search_fields(self):
        return []

    def get_queryset(self):
        if self.queryset is None:
            raise NotImplementedError("Define queryset or override get_queryset()")
        return self.queryset.all()

    def validate_required_fields(self, data, partial=False):
        required_fields = self.get_required_fields()
        errors = {}

        for field in required_fields:
            if partial and field not in data:
                continue
            value = data.get(field)
            if value is None or (isinstance(value, str) and not value.strip()):
                errors[field] = ["This field is required and cannot be blank."]

        if errors:
            raise ValidationError(errors)

    def post(self, request):
        params = request.data  # Now using request body instead of query params
        pageSize = int(params.get('pageSize', 10))
        prev_pageSize = request.session.get('prev_pageSize')
        page = int(params.get('page', 1))

        if prev_pageSize is not None and prev_pageSize != pageSize:
            page = 1
        request.session['prev_pageSize'] = pageSize

        order_by_field = params.get('order_by_field', 'id')
        order_by_value = params.get('order_by_value', 'desc')
        search_text = params.get('search_text', '').strip()

        queryset = self.get_queryset()

        if search_text:
            search_fields = self.get_search_fields()
            queries = Q()
            for field in search_fields:
                kwargs = {f"{field}__icontains": search_text}
                queries |= Q(**kwargs)
            queryset = queryset.filter(queries)

        if order_by_field:
            order = order_by_field if order_by_value.lower() == 'asc' else f"-{order_by_field}"
            queryset = queryset.order_by(order)

        total_count = queryset.count()
        if total_count == 0:
            response_data = {
                "message": "Success",
                "status": status.HTTP_200_OK,
                "data": [],
                "count": 0,
                "page": page,
                "pageSize": pageSize,
                "no_of_pages": 0
            }
            return Response(response_data, status=status.HTTP_200_OK)    
        paginator = self.pagination_class()
        paginator.page_size = pageSize

        # Mutate the underlying GET query dict for paginator
        from django.http import QueryDict
        query_params = request.query_params.copy()
        query_params['page'] = str(page)
        request._request.GET = query_params

        paginated_qs = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(paginated_qs, many=True)

        no_of_pages = ceil(total_count / pageSize) if pageSize else 1
        
        response_data = {
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data,
            "count": queryset.count(),
            "page": page,
            "pageSize": pageSize,
            "no_of_pages": no_of_pages
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            obj = self.get_queryset().get(pk=pk)
        except self.queryset.model.DoesNotExist:
            response_data = {
                "message": "Record not found.",
                "status": status.HTTP_404_NOT_FOUND
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(obj)
        response_data = {
            "message": "Success",
            "status": status.HTTP_200_OK,
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def create(self, request):
        self.validate_required_fields(request.data)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response_data = {
            "message": "Record created successfully.",
            "status": status.HTTP_201_CREATED,
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        try:
            obj = self.get_queryset().get(pk=pk)
        except self.queryset.model.DoesNotExist:
            response_data = {
                "message": "Record not found.",
                "status": status.HTTP_404_NOT_FOUND
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        self.validate_required_fields(request.data)
        serializer = self.serializer_class(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response_data = {
            "message": "Record updated successfully.",
            "status": status.HTTP_200_OK,
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        try:
            obj = self.get_queryset().get(pk=pk)
        except self.queryset.model.DoesNotExist:
            response_data = {
                "message": "Record not found.",
                "status": status.HTTP_404_NOT_FOUND
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        self.validate_required_fields(request.data, partial=True)
        serializer = self.serializer_class(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response_data = {
            "message": "Record updated successfully.",
            "status": status.HTTP_200_OK,
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        try:
            obj = self.get_queryset().get(pk=pk)
        except self.queryset.model.DoesNotExist:
            response_data = {
                "message": "Record not found.",
                "status": status.HTTP_404_NOT_FOUND
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        response_data = {
            "message": "Record deleted successfully.",
            "status": status.HTTP_204_NO_CONTENT
        }
        return Response(response_data, status=status.HTTP_200_OK)