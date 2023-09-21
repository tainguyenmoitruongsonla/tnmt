import axios from 'axios';
import apiUrl from '../config';

async function fetchData(url: string, params: any) {
    try {
        const response = await axios.get(`${apiUrl}/${url}`, {
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


export default fetchData;