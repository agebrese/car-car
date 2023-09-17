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

    function handleDelete(id) {

        fetch(`http://localhost:8090/api/salespeople/${id}/`, {
            method: 'delete',
        });
    }

    return (
        <>
            <h1 className='mt-5 text-center'>Sales People</h1>
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
                                <td className='text-center align-middle'>{salesperson.last_name}
                                    <span className='m-3'>
                                        <button onClick={() => handleDelete(salesperson.id)} className="btn btn-danger btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg></button>
                                    </span>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table >

        </>
    )
}

export default SalesPersonList;
