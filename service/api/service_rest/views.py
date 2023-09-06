from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json

from .models import Technician, Appointment

# Create your views here.
class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "id",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }
    def get_extra_data(self, o):
        return {"technician": o.technician.id}



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse (
            {"technicians": technicians},
            encoder = TechnicianListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_show_technician(request, pk):
    if request.method == "DELETE":
        try:
            technician = Technician.objects.filter(id=pk).delete()
            # NOTE IN THE ABOVE LINE ID MAY NEED TO GET TURNED INTO EMPLOYEE_ID DEPENDING HOW WE TRACK TECHS
            return JsonResponse(
            technician,
            encoder = TechnicianDetailEncoder,
            safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_show_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse (
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def api_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            appointment = Appointment.objects.filter(id=pk).delete()
            return JsonResponse(
            appointment,
            encoder = AppointmentListEncoder,
            safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})



@require_http_methods(["PUT"])
def cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.status = "Canceled"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False
    )


@require_http_methods(["PUT"])
def finished_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.status = "Finished"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False
    )
