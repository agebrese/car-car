from django.urls import path

from .views import (api_list_technicians,
                    api_show_technician,
                    api_show_appointments,
                    api_appointment,
                    cancel_appointment,
                    finished_appointment)


urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_show_technician, name="api_show_technician"),
    path("appointments/", api_show_appointments, name="api_show_appointments"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("appointments/<int:pk>/cancel/", cancel_appointment, name="cancel_appointment"),
    path("appointments/<int:pk>/finish/", finished_appointment, name="finished_appointment"),
]
