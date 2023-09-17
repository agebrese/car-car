from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Sale, Customer
from django.views.decorators.http import require_http_methods
import json


# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "import_href"]


class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salesperson", "customer", "price", "id"]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse({"salesperson": salesperson}, encoder=SalesPersonEncoder)

    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the salesperson"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def show_salesperson(request, id):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse({"customer": customer}, encoder=CustomerEncoder)

    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the customer"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def show_customer(request, id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)

    elif request.method == "POST":
        content = json.loads(request.body)

        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            automobile.sold = True
            automobile.save()
            content["automobile"] = automobile

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin"},
                status=400,
            )
        try:
            employee_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee_id"},
                status=400,
            )
        try:
            phone_number = content["customer"]
            customer = Customer.objects.get(phone_number=phone_number)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid phone number"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def show_sale(request, id):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
