import { useEffect, useState } from 'react';

function ScheduledAppointmentList() {
    const [appointments, setAppointments] = useState([]);
    // const [vip, seVip] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setAppointments(data.appointments)
        }
    }

    const cancelAppointment = async (id) => {
        const response = await fetch('http://localhost:8080/api/appointments/' + id + '/cancel/', {
            method:"PUT"
        });

        if (response.ok) {
            getData()
        }
    }

    const finishAppointment = async (id) => {
        const response = await fetch('http://localhost:8080/api/appointments/' + id + '/finish/', {
            method:"PUT"
        });

        if (response.ok) {
            getData()
        }
    }



    useEffect(()=>{
        getData();
        // getSoldData()
    }, [])

    return (
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
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        if (appointment.status == "Scheduled") {
                        return (
                            <tr key={ appointment.id }>
                                <td>{ appointment.vin }</td>
                                <td></td>
                                <td>{ appointment.customer }</td>
                                <td>{ appointment.date }</td>
                                <td>{ appointment.time }</td>
                                <td>{ appointment.technician }</td>
                                <td>{ appointment.reason }</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>cancelAppointment(appointment.id)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={()=>finishAppointment(appointment.id)}>Finish</button>
                                </td>
                            </tr>
                        );
                    }})}

                </tbody>
            </table>
    )


}

export default ScheduledAppointmentList
