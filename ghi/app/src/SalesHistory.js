import { useEffect, useState } from 'react';


function SalesHistory() {
    const [sale, setSale] = useState([])
    const [salesperson, setSalesperson] = useState([]);
    const [selectSalesData, setselectSalesData] = useState({
        salesperson: "",
    })

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json()
            setSale(data.sales)
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
        getData()
        getSalesPersonData();
    }, [])

    const handleSalesPersonChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setselectSalesData({
            //Previous form data is spread (i.e. copied) into our new state object
            ...selectSalesData,
            //On top of the that data, we add the currently engaged input key and value
            [inputName]: value
        });

    }




    return (
        <>
            <h1 className='mt-5'>Salesperson History</h1>
            <select onChange={handleSalesPersonChange} value={selectSalesData.salesperson} name="salesperson" id="salesperson" className="form-select mt-5">
                <option value="">Choose an Salesperson</option>
                {salesperson.map(salesperson => {
                    return (
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                            {salesperson.first_name}
                        </option>
                    )
                })}
            </select>
            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th className='text-center'>Salesperson</th>
                        <th className='text-center'>Customer</th>
                        <th className='text-center'>VIN</th>
                        <th className='text-center'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.map(sale => {
                        if (selectSalesData.salesperson === sale.salesperson.employee_id)
                            return (
                                <tr key={sale.href}>
                                    <td className='text-center align-middle'>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td className='text-center align-middle'>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td className='text-center align-middle'>{sale.automobile.vin}</td>
                                    <td className='text-center align-middle'>{sale.price}</td>
                                </tr>
                            );
                    })}
                </tbody>
            </table >

        </>
    )
}

export default SalesHistory;
