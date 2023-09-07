import { useEffect, useState } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setTechnicians(data.technicians)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

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
                            <tr key={ technician.id }>
                                <td>{ technician.first_name }</td>
                                <td>{ technician.last_name }</td>
                                <td>{ technician.employee_id }</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
    )
}

export default TechnicianList;