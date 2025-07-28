from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and response.status_code == status.HTTP_400_BAD_REQUEST:
        errors = {}
        # Loop through each field and keep error messages list
        for field, messages in response.data.items():
            if isinstance(messages, list):
                errors[field] = messages
            elif isinstance(messages, dict):
                # nested errors (optional, depending on serializer)
                errors[field] = []
                for subfield, submessages in messages.items():
                    errors[field].extend(submessages)
            else:
                errors[field] = [str(messages)]

        custom_response_data = {
            "message": "Validation failed",
            "status": status.HTTP_400_BAD_REQUEST,
            "errors": errors
        }
        return Response(custom_response_data, status=status.HTTP_200_OK)

    return response
