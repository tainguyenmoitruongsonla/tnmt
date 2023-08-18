import { enqueueSnackbar } from "notistack";
import apiUrl from "./config";

const upload = async (postData: any) => {
    const token = localStorage.getItem('token');
    try {
        const formData = new FormData();

        formData.append('filePath', postData.filePath);
        formData.append('fileName', postData.fileName);
        formData.append('file', postData.file); // Make sure postData.file is a File object

        const response = await fetch(`${apiUrl}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const resData = await response.json();
        if (response.ok) {

            // Show success snackbar notification
            enqueueSnackbar('File upload thành công', { variant: 'success' });

            if (resData?.id) {
                return resData;
            } else {
                return true;
            }
        } else {
            // Show error snackbar notification
            enqueueSnackbar('File upload thất bại', { variant: 'error' });

            return false;
        }
    } catch (error) {
        console.error('Error:', error);

        return false;
    }
};

export default upload;
