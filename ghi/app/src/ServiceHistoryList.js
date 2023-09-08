import { useEffect, useState } from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState('');
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

    useEffect(()=>{
        getData();
        getSoldData()
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
                        return search === '' ? appointment : appointment.vin.includes(search.toUpperCase())
                    }).map(appointment => {
                        if (salesVinList.includes(appointment.vin)) {
                        return (
                            <tr key={ appointment.id }>
                                <td>{ appointment.vin }</td>
                                <td>Yes</td>
                                <td>{ appointment.customer }</td>
                                <td>{ appointment.date }</td>
                                <td>{ appointment.time }</td>
                                <td>{ appointment.technician }</td>
                                <td>{ appointment.reason }</td>
                                <td>{ appointment.status }</td>
                            </tr>
                        );
                        } else {
                            return (
                                <tr key={ appointment.id }>
                                    <td>{ appointment.vin }</td>
                                    <td>No</td>
                                    <td>{ appointment.customer }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.time }</td>
                                    <td>{ appointment.technician }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ appointment.status }</td>
                                </tr>
                            );
                        }
                    })}

                </tbody>
            </table>
        </>
    )
}
export default ServiceHistory
