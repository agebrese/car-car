# CarCar

Team:

* Person 1 - Zach Schmidt - Service
* Person 2 - Abraham Gebreselasie - Sales

## Design


## Service microservice

We created three models for this microservice. Technician, Appointment, and AutomobileVO.
In the technician model we made sure to create the employee id field as a unique field so that each employee can be tracked by this id and not have an issues with the same id #.
AutomobileVO model was made to to get automobile info from inventory if needed.(I ended up making the app without ever having to access inventory directly, but indirectly it is accessed by the sales side, and im getting data from sales to populate vlues like VIP and sold on the automobile list and service appointments/service history)
Appointment model was made with properties to allow anyone, not just someone who has purchased a car from us, create an appointment with our service center. We did set status to default to scheduled, so it will show up on the eservice appointment list, then from there you can either cancel or finish it, but all three status's will show up on service history list.

We mainly used just the technician model and appointment model to make the front and back ends of the SPA.
The technician model was used to be able to create a technician, and to create an appointment with a specific technician, given as an option in the drop down. Once the appointment was created, you can access that technician through the appointment properties. There is also a functionality to delete a technician, but this will have to be done through Insomnia, as there was no requirement to have a delete option show up anywhere in the browser.
The Appointment model was used to create, list, and cancel or finish appointments. The cacnel and finish view functions would never delete an appointment but rather move it to a different end point that would set the status to either finished or canceled.

Then when it came to the VIP treatment, meaning the appointment was for a car that we sold, we called the sales list endpoint and got all those VINs and if the appointment VIN matched a sales vin then the car would be registered as a VIP.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.

