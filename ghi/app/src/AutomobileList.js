import { useEffect, useState } from 'react';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    const getSoldData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    const salesVinList = sales.map(sale => {
        return sale.automobile.vin
    })

    useEffect(() => {
        getData();
        getSoldData()
    }, [])

    function handleDelete(vin) {

        fetch(`http://localhost:8100/api/automobiles/${vin}/`, {
            method: 'delete',
        });
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.map(auto => {
                    if (salesVinList.includes(auto.vin)) {
                        return (
                            <tr key={auto.id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>Yes
                                    <span className='m-3'>
                                        <button onClick={() => handleDelete(auto.vin)} className="btn btn-danger btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg></button>
                                    </span>
                                </td>
                            </tr>
                        );
                    } else {
                        return (
                            <tr key={auto.id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>No
                                    <span className='m-3'>
                                        <button onClick={() => handleDelete(auto.vin)} className="btn btn-danger btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg></button>
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                })}

            </tbody>
        </table>
    )


}

export default AutomobileList
