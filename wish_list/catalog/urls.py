from django.urls import path
from catalog import views

urlpatterns = [
    path('', base.html, name='base'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)