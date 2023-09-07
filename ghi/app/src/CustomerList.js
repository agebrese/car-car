import { useEffect, useState } from 'react';


function CustomerList() {
    const [customer, setCustomer] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
            const data = await response.json()
            setCustomer(data.customer)
        }


    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <>

            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th className='text-center'>First Name</th>
                        <th className='text-center'>Last Name</th>
                        <th className='text-center'>Phone Number</th>
                        <th className='text-center'>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.map(customer => {
                        return (
                            <tr key={customer.phone_number}>

                                <td className='text-center align-middle'>{customer.first_name}</td>
                                <td className='text-center align-middle'>{customer.last_name}</td>
                                <td className='text-center align-middle'>{customer.phone_number}</td>
                                <td className='text-center align-middle'>{customer.address}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table >

        </>
    )
}

export default CustomerList;
