import apiUrl from "./config";

const postApiData = async (url: string, postData: any) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        });

        console.log(postData)

        if (response.ok) {
            // Post request succeeded
            console.log('Data successfully posted!');

            return true;
        } else {
            // Post request failed
            console.error('Failed to post data.');

            return false;
        }
    } catch (error) {
        console.error('Error:', error);

        return false;
    }
};

export default postApiData;

