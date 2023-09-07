import { useEffect, useState } from 'react';

function CustomerForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
    })

    useEffect(() => {

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const customerURL = 'http://localhost:8090/api/customers/';

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(customerURL, fetchConfig)
        if (response.ok) {
            const newCustomer = await response.json();

            setFormData({
                first_name: '',
                last_name: '',
                address: '',
                phone_number: '',
            });
        }
    }
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,

            [inputName]: value
        })
    }

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="offset-3 col-6" aria-hidden>
                    <div className="shadow p-4 mt-4">
                        <h1>Add A Customer</h1>
                        <form onSubmit={handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input value={formData.first_name} onChange={handleFormChange} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.last_name} onChange={handleFormChange} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.address} onChange={handleFormChange} placeholder="Address" required type="text" id="address" name="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.phone_number} onChange={handleFormChange} placeholder="Phone Number" required type="text" id="phone_number" name="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>


                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm;
