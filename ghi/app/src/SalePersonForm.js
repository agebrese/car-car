import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesPersonForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })
    const navigate = useNavigate();

    useEffect(() => { }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const salesPersonURL = 'http://localhost:8090/api/salespeople/';

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(salesPersonURL, fetchConfig)
        if (response.ok) {
            const newSalesPerson = await response.json();

            setFormData({
                first_name: '',
                last_name: '',
                employee_id: '',
            });
        }
        navigate('/salesperson');
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
                        <h1>Add A Salesperson</h1>
                        <form onSubmit={handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input value={formData.first_name} onChange={handleFormChange} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.last_name} onChange={handleFormChange} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.employee_id} onChange={handleFormChange} placeholder="Employee ID" required type="number" id="employee_id" name="employee_id" max={9999} className="form-control" />
                                <label htmlFor="employee_id">Employee ID</label>
                            </div>



                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesPersonForm;
