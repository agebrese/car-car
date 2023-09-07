import { useEffect, useState } from 'react';

function ManufacturerList() {
    const [manufacturer, setManufacturer] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json()
            setManufacturer(data.manufacturers)
        }


    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <h1 className='mt-5'>Manufacturers</h1>
            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th className='text'>Name</th>

                    </tr>
                </thead>
                <tbody>
                    {manufacturer.map(manufacturer => {
                        return (
                            <tr key={manufacturer.href}>
                                <td className='text align-middle'>{manufacturer.name}</td>

                            </tr>
                        );
                    })}
                </tbody>
            </table >

        </>
    )
}


export default ManufacturerList;
