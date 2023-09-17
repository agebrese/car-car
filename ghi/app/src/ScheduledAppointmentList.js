import { useEffect, useState } from 'react';

function ScheduledAppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');


        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }


    const getSoldData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)

        }

    }

    const salesVinList = sales.map(sale => {
        return sale.automobile.vin
    })

    const cancelAppointment = async (id) => {
        const response = await fetch('http://localhost:8080/api/appointments/' + id + '/cancel/', {
            method: "PUT"
        });

        if (response.ok) {
            getData();
            getSoldData();
        }
    }


    const finishAppointment = async (id) => {
        const response = await fetch('http://localhost:8080/api/appointments/' + id + '/finish/', {
            method: "PUT"
        });

        if (response.ok) {
            getData();
            getSoldData();
        }
    }





    useEffect(() => {
        getData();
        getSoldData()
    }, [])

    function handleDelete(id) {

        fetch(`http://localhost:8080/api/appointments/${id}/`, {
            method: 'delete',
        });
    }

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
                    if (appointment.status == "Scheduled" && salesVinList.includes(appointment.vin)) {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>Yes</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => finishAppointment(appointment.id)}>Finish</button>
                                    <span className='m-3'>
                                        <button onClick={() => handleDelete(appointment.id)} className="btn btn-danger btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg></button>
                                    </span>
                                </td>
                            </tr>
                        );
                    } else if (appointment.status == "Scheduled") {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>No</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                    <button className="btn btn-primary btn-sm" onClick={() => finishAppointment(appointment.id)}>Finish</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(appointment.id)} className="btn btn-danger btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg></button>
                                </td>
                            </tr>
                        );

                    }
                })}

            </tbody>
        </table>
    )


}

export default ScheduledAppointmentList
