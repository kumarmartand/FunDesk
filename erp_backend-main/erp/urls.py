from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
    path('', SpectacularSwaggerView.as_view(url_name='schema')),

    #app urls
    path('api/', include('authuser.urls')),
    path('api/master/', include('master.urls')),
    path('api/student/', include('student.urls')),
]
