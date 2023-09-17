import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleForm() {
    const [sales, setSales] = useState([]);
    const [autos, setAutomobile] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [salesperson, setSalesperson] = useState([]);
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: "",
        customer: "",
        price: '',

    })
    const navigate = useNavigate();

    const getAutoData = async () => {
        const url = "http://localhost:8100/api/automobiles/"

        const response = await fetch(url);


        if (response.ok) {
            const data = await response.json();
            setAutomobile(data.autos)
        }
    }


    const getSalesData = async () => {
        const url = "http://localhost:8090/api/sales/"

        const response = await fetch(url);


        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }

    }

    const salesList = sales.map(sale => {
        return sale.automobile.vin
    })


    const getCustomerData = async () => {
        const url = "http://localhost:8090/api/customers/"

        const response = await fetch(url);


        if (response.ok) {
            const data = await response.json();
            setCustomer(data.customer)

        }
    }

    const getSalesPersonData = async () => {
        const url = "http://localhost:8090/api/salespeople/"

        const response = await fetch(url);


        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson)

        }
    }

    useEffect(() => {
        getAutoData();
        getCustomerData();
        getSalesPersonData();
        getSalesData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const saleURL = 'http://localhost:8090/api/sales/';

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(saleURL, fetchConfig)
        if (response.ok) {
            const newSale = await response.json();

            setFormData({
                automobile: '',
                salesperson: "",
                customer: "",
                price: '',
            });
        }

        navigate('/sale');

    }
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            //Previous form data is spread (i.e. copied) into our new state object
            ...formData,
            //On top of the that data, we add the currently engaged input key and value
            [inputName]: value
        });

    }

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="offset-3 col-6" aria-hidden>
                    <div className="shadow p-4 mt-4">
                        <h1>Record A New Sale</h1>
                        <form onSubmit={handleSubmit} id="create-sale-form">
                            <div className="mb-3">
                                <label htmlFor="automobile" className="form-label">AutoMobile VIN</label>
                                <select onChange={handleFormChange} value={formData.automobile} required id="automobile" name="automobile" className="form-select">
                                    <option value="">Choose an AutoMobile VIN</option>
                                    {autos.map((automobile) => {
                                        if (salesList.includes(automobile.vin) == false) {
                                            return (
                                                <option key={automobile.vin} value={automobile.vin}>
                                                    {automobile.vin}
                                                </option>
                                            )
                                        }
                                    })}
                                </select>
                                <label htmlFor="customer" className="form-label">Customer</label>
                                <select onChange={handleFormChange} value={formData.customer} required id="customer" name="customer" className="form-select">
                                    <option value="">Choose an Customer</option>
                                    {customer.map(customer => {
                                        return (
                                            <option key={customer.phone_number} value={customer.phone_number}>
                                                {customer.first_name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="salesperson" className="form-label">Salesperson</label>
                                <select onChange={handleFormChange} value={formData.salesperson} required id="salesperson" name="salesperson" className="form-select">
                                    <option value="">Choose an Salesperson</option>
                                    {salesperson.map(salesperson => {
                                        return (
                                            <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                                {salesperson.first_name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <div className="form mb-3">
                                    <label htmlFor="price">Price</label>
                                    <input value={formData.price} onChange={handleFormChange} placeholder="Price" required type="number" min={1} max={300000} id="price" name="price" className="form-control" />

                                </div>
                            </div>
                            <button className="btn btn-primary">Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleForm;
