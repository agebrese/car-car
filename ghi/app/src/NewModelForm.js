import React, { useEffect, useState } from 'react';

function NewModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [name, setName] = useState('');
    const [picture_url, setPicture_Url] = useState('');
    const [manufacturer_id, setManufacturer] = useState('');

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleUrlChange = (event) => {
        const value = event.target.value;
        setPicture_Url(value);
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name;
        data.picture_url = picture_url;
        data.manufacturer_id = manufacturer_id;


        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },

        };
        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();


            setName('');
            setPicture_Url('');
            setManufacturer('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a New Model</h1>
                    <form onSubmit={handleSubmit} id="newModelForm">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Model Name" required type="text" id="name" name="name" className="form-control" />
                            <label htmlFor="name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleUrlChange} value={picture_url} placeholder="Picture URL" required type="url" id="picture_url" name="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                            <select onChange={handleManufacturerChange} value={manufacturer_id} required id="manufacturer_id" name="manufacturer_id" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewModelForm
