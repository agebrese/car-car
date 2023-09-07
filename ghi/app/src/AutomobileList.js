import { useEffect, useState } from 'react';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);
    // const [sold, setSold] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    // const getSoldData = async () => {
    //     const response = await fetch('http://localhost:8090/api/sales/');

    //     if (response.ok) {
    //         const data = await response.json();
    //         setSold(data.autos.sold)
    //     }
    // }

    useEffect(()=>{
        getData();
        // getSoldData()
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
                    return (
                        <tr key={ auto.id }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name }</td>
                            {/* <td>{ auto.sold }</td> */}
                        </tr>
                    );
                })}

            </tbody>
        </table>
    )


}

export default AutomobileList
