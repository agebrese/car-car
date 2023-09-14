import { useEffect, useState } from 'react';


function SalesPersonList() {
    const [salesperson, setSalesPeople] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');

        if (response.ok) {
            const data = await response.json()
            setSalesPeople(data.salesperson)
        }


    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <h1 className='mt-5'>Sales People</h1>
            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th className='text-center'>Employee ID</th>
                        <th className='text-center'>First Name</th>
                        <th className='text-center'>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salesperson.map(salesperson => {
                        return (
                            <tr key={salesperson.employee_id}>
                                <td className='text-center align-middle'>{salesperson.employee_id}</td>
                                <td className='text-center align-middle'>{salesperson.first_name}</td>
                                <td className='text-center align-middle'>{salesperson.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table >

        </>
    )
}

export default SalesPersonList;
