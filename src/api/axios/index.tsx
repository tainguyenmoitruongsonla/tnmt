import axios from 'axios';
import apiUrl from '../config';
import { enqueueSnackbar } from 'notistack';

export async function getData(url: string, params?: any) {
    try {
        const response = await axios.get(`${apiUrl}/${url}`, { params });

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

export async function saveData(url: string, data: any) {
    try {
        const response = await axios.post(`${apiUrl}/${url}`, data);
        enqueueSnackbar(response.data, { variant: 'success' });

        return response.data;
    } catch (error) {
        enqueueSnackbar('Lỗi lưu dữ liệu', { variant: 'error' });
        console.error('Error posting data:', error);
        throw error;
    }
}

export async function deleteData(url: string, resourceId: any) {
    try {
        const response = await axios.post(`${apiUrl}/${url}/${resourceId}`);
        enqueueSnackbar(response.data, { variant: 'success' });

        return response.data;
    } catch (error) {
        enqueueSnackbar('Lỗi xóa dữ liệu', { variant: 'error' });
        console.error('Error deleting data:', error);
        throw error;
    }
}
