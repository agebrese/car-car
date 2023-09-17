import { useEffect, useState } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function handleDelete(id) {

        fetch(`http://localhost:8080/api/technicians/${id}/`, {
            method: 'delete',
        });
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Fist Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                            <td>{technician.employee_id}
                                <span className='m-3'>
                                    <button onClick={() => handleDelete(technician.id)} className="btn btn-danger btn-sm">
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

export default TechnicianList;
