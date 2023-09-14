import { useEffect, useState } from 'react';


function SalesList() {
    const [sale, setSale] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json()
            setSale(data.sales)
        }


    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <h1 className='mt-5'>Sales List</h1>
            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th className='text-center'>Sales Person Employee ID</th>
                        <th className='text-center'>Salesperson Name</th>
                        <th className='text-center'>Customer</th>
                        <th className='text-center'>VIN</th>
                        <th className='text-center'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.map(sale => {
                        return (
                            <tr key={sale.href}>
                                <td className='text-center align-middle'>{sale.salesperson.employee_id}</td>
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

export default SalesList;
