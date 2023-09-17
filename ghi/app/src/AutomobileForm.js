import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AutomobileForm() {
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
    })
    const navigate = useNavigate();

    const getData = async () => {
        const url = "http://localhost:8100/api/models/"

        const response = await fetch(url);


        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const autoURL = 'http://localhost:8100/api/automobiles/'

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(autoURL, fetchConfig)
        if (response.ok) {
            const newAuto = await response.json();

            setFormData({
                color: '',
                year: '',
                vin: '',
                model_id: '',

            });
        }
        navigate('/automobiles/all');
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
                        <h1>Add An Automobile To Inventory</h1>
                        <form onSubmit={handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input value={formData.color} onChange={handleFormChange} placeholder="Color" required type="text" id="color" name="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.year} onChange={handleFormChange} placeholder="Year" required type="text" id="year" name="year" className="form-control" />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={formData.vin} onChange={handleFormChange} placeholder="VIN" required type="text" id="vin" name="vin" className="form-control" />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <select onChange={handleFormChange} value={formData.model_id} required id="model_id" name="model_id" className="form-select">
                                <option value="">Choose A Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    )
                                })}
                            </select>



                            <button className="btn btn-primary mt-4">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutomobileForm;
