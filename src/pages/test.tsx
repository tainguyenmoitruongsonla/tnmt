import axios from 'axios';
import { useEffect, useState } from 'react';

async function fetchData(apiUrl: string, params: any) {
    try {
        const response = await axios.get(`${apiUrl}`, {
            params: params,
        });

        // Kiểm tra xem yêu cầu thành công (status code 200)
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const params = {
    LicenseNumber: null,
    LicensingAuthorities: null,
    LicenseTypeId: 0,
    LicenseValidity: null,
    BusinessId: 0,
    ConstructionId: 0,
    ConstructionType: 0,
    DistrictId: 0,
    CommuneId: 0,
    SubBasinId: 0,
}

const Pages = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(
            fetchData('https://localhost:7249/api/License/list', params)
                .then((data) => {
                    setData(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        )
    }, [])

    console.log(data)

    return (
        <></>
    )
}

export default Pages;
