# CarCar

Team:

* Person 1 - Which microservice?
* Abraham- Sales microservice

## Design
![Project Beta Design](ProjectBetaDesign.png)
## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The Sales microservice uses 4 models: Sale, Salesperson, Customer, and AutomobileVO. The fields for the Sale model are automobile, which is a foreign key field to the AutomobileVO model, the salesperson which is a foreign key field to the Salesperson model, the customer which is a foreign key field to the Customer, model, and also the price field. The fields represent a data needed to record a sale of an automobile. The fields for the Customer model were first_name, last_name, address, and phone_number. The fields represent the data needed to record a customer for the dealership, I also made the phone number a unique field to id a individual customer. The Salesperson model fields are first_name, last_name, and employee_id, with the employee_id being a unique field to id an indivdiual salesperson. The fields represent the data needed to record a salesperson for the dealership. The AutomobileVO model fields are vin, the vin being a automobile's VIN number, sold being either true or false if the car has been sold by the dealership, and the import_href being the href of the automobile url when the car was created in the inventory microservice.


The view functions in sales/api/sales_rest/views.py allow for the viewing of all sales, customers, salespeople, and the  creation of new sale, customer, and salespersons. The view function also allow for the deletion of the models: sale, customer, saleperson.


The integration the sales microservice has with the inventory microservice is with the use of a poller. The poller makes an api call to the inventory microservice which has all of the automobiles created, and every 60 second checks to see if any new automobiles were created or updated and will either create a new AutomobileVO or update the existing automobileVO in the sales microservice.
