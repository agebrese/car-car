import { useEffect, useState } from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState('')

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    return (
        <>
        <form>
            <input type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search VINs'
            />
        </form>
        <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.filter((appointment) => {
                        return search.toLowerCase() === '' ? appointment : appointment.vin.toLowerCase().includes(search)
                    }).map(appointment => {
                        return (
                            <tr key={ appointment.id }>
                                <td>{ appointment.vin }</td>
                                <td></td>
                                <td>{ appointment.customer }</td>
                                <td>{ appointment.date }</td>
                                <td>{ appointment.time }</td>
                                <td>{ appointment.technician }</td>
                                <td>{ appointment.reason }</td>
                                <td>{ appointment.status }</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </>
    )
}
export default ServiceHistory
