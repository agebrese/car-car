from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=10, unique=True)

    def get_api_url(self):
        return reverse("show_salesperson", kwargs={"id": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12, unique=True)

    def get_api_url(self):
        return reverse("show_customer", kwargs={"id": self.id})


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="autmobile",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.CharField(max_length=10)

    def get_api_url(self):
        return reverse("show_sale", kwargs={"id": self.id})
