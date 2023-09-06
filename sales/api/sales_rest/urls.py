from django.urls import path

from .views import (
    list_salesperson,
    show_salesperson,
    list_customers,
    show_customer,
    list_sales,
)


urlpatterns = [
    path(
        "salespeople/",
        list_salesperson,
        name="list_salesperson",
    ),
    path("salespeople/<int:id>/", show_salesperson, name="show_salesperson"),
    path(
        "customers/",
        list_customers,
        name="list_customers",
    ),
    path("customers/<int:id>/", show_customer, name="show_customer"),
    path(
        "sales/",
        list_sales,
        name="list_sales",
    ),
]
