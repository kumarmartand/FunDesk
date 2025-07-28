import os
from uuid import uuid4
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.utils.serializer_helpers import ReturnDict, ReturnList
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse

from .models import House, StudentAdmission
from .serializers import HouseSerializer, FlatStudentSerializer, FlatStudentPartialUpdateSerializer
from base.views import BaseViewSet


def format_errors(errors):
    if isinstance(errors, (ReturnDict, dict)):
        return {field: format_errors(value) for field, value in errors.items()}
    elif isinstance(errors, (ReturnList, list)):
        return [format_errors(e) for e in errors]
    return errors


@extend_schema_view(
    post=extend_schema(tags=["House"]),
    retrieve=extend_schema(tags=["House"]),
    create=extend_schema(tags=["House"]),
    update=extend_schema(tags=["House"]),
    partial_update=extend_schema(tags=["House"]),
    destroy=extend_schema(tags=["House"]),
)
class HouseViewSet(BaseViewSet):
    queryset = House.objects
    serializer_class = HouseSerializer

    def get_required_fields(self):
        return ['name']

    def get_search_fields(self):
        return ['name']

    @extend_schema(
        methods=["GET"],
        tags=["House"],
        description="Get all house records",
        responses={200: OpenApiResponse(response={
            "message": "Success", "status": 200, "data": [{"id": 1, "name": "ABC"}], "count": 1
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


@extend_schema_view(
    post=extend_schema(tags=["Student"]),
    retrieve=extend_schema(tags=["Student"]),
    create=extend_schema(tags=["Student"]),
    update=extend_schema(tags=["Student"]),
    partial_update=extend_schema(tags=["Student"]),
    destroy=extend_schema(tags=["Student"]),
)

class StudentViewSet(BaseViewSet):
    queryset = StudentAdmission.objects.all()
    serializer_class = FlatStudentSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_required_fields(self):
        return ['roll_number', 'school_class', 'section']

    def get_search_fields(self):
        return ['roll_number']

    def save_file(self, file):
        if not file.content_type.startswith(('image/', 'application/')):
            raise ValueError("Only image or document files are allowed.")
        if file.size > 5 * 1024 * 1024:
            raise ValueError("File too large (max 5MB).")
        ext = file.name.split('.')[-1]
        unique_name = f"{uuid4().hex}.{ext}"
        file_path = os.path.join('students/', unique_name)
        return default_storage.save(file_path, ContentFile(file.read()))

    def create(self, request, *args, **kwargs):
        try:
            data = request.data.dict()
            files = request.FILES

            documents = []
            photo_files = {}

            for key in files:
                if key.startswith("document_") and key.endswith("_files"):
                    index = key.split("_")[1]
                    title_key = f"document_{index}_title"
                    title = request.data.get(title_key, "Untitled Document")
                    documents.append({'title': title, 'document': files[key]})
                elif key in ['student_photo', 'father_photo', 'mother_photo', 'guardian_photo']:
                    photo_files[key] = files[key]
                    data[key] = "placeholder.jpg"

            data['documents'] = [{} for _ in documents]

            serializer = FlatStudentSerializer(data=data)
            serializer.is_valid(raise_exception=True)

            for key in photo_files:
                data[key] = self.save_file(photo_files[key])

            data['documents'] = [
                {'title': doc['title'], 'document': self.save_file(doc['document'])}
                for doc in documents
            ]

            serializer = FlatStudentSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            student = serializer.save()

            return Response({
                "message": "Success",
                "status": status.HTTP_201_CREATED,
                "data": FlatStudentSerializer(student).data
            })

        except ValueError as e:
            return Response({"message": str(e), "status": 400}, status=400)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            data = request.data.dict()
            files = request.FILES

            documents = []
            photo_files = {}

            for key in files:
                if key.startswith("document_") and key.endswith("_files"):
                    index = key.split("_")[1]
                    title_key = f"document_{index}_title"
                    title = request.data.get(title_key, "Untitled Document")
                    documents.append({'title': title, 'document': files[key]})
                elif key in ['student_photo', 'father_photo', 'mother_photo', 'guardian_photo']:
                    photo_files[key] = files[key]
                    data[key] = "placeholder.jpg"

            data['documents'] = [{} for _ in documents]

            serializer = FlatStudentPartialUpdateSerializer(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)

            for key in photo_files:
                data[key] = self.save_file(photo_files[key])

            data['documents'] = [
                {'title': doc['title'], 'document': self.save_file(doc['document'])}
                for doc in documents
            ]

            serializer = FlatStudentPartialUpdateSerializer(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            student = serializer.save()

            return Response({
                "message": "Success",
                "status": status.HTTP_200_OK,
                "data": FlatStudentSerializer(student).data
            })

        except ValueError as e:
            return Response({"message": str(e), "status": 400}, status=400)

    @extend_schema(
        methods=["GET"],
        tags=["Student"],
        description="Get all students",
        responses={200: OpenApiResponse(response={
            "message": "Success", "status": 200, "data": [{"id": 1, "roll_number": "101"}], "count": 1
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