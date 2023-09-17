import { useEffect, useState } from 'react';

function ModelList() {
    const [models, setModels] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();

            setModels(data.models)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function handleDelete(id) {

        fetch(`http://localhost:8100/api/models/${id}/`, {
            method: 'delete',
        });
    }


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td>
                                <img width="250" src={model.picture_url} alt="car"></img>
                                <span className='m-3'>
                                    <button onClick={() => handleDelete(model.id)} className="btn btn-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg></button>
                                </span>
                            </td>
                        </tr>
                    );
                })}

            </tbody>
        </table>
    )

}

export default ModelList
