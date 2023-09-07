import { useEffect, useState } from 'react';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: '',
    })

    useEffect(() => {

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const manufacturerURL = 'http://localhost:8100/api/manufacturers/';

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(manufacturerURL, fetchConfig)
        if (response.ok) {
            const newManufacturer = await response.json();

            setFormData({
                name: '',

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
                        <h1>Create A Manufacturer</h1>
                        <form onSubmit={handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input value={formData.name} onChange={handleFormChange} placeholder="Manufacturer Name" required type="text" id="name" name="name" className="form-control" />
                                <label htmlFor="name">Manufacturer Name</label>
                            </div>



                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm;
