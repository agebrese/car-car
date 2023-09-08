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

    useEffect(()=>{
        getData();
        getSoldData()
    }, [])

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
                        <tr key={ auto.id }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name }</td>
                            <td>Yes</td>
                        </tr>
                    );
                    } else {
                        return (
                            <tr key={ auto.id }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name }</td>
                            <td>No</td>
                        </tr>
                        )
                    }
                })}

            </tbody>
        </table>
    )


}

export default AutomobileList
