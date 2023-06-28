import apiUrl from "./config";

const fetchApiData = async (url: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            // Handle non-200 status code
            const errorData = await response.text();

            throw new Error(errorData);
        }
    } catch (error) {
        // Handle fetch or parsing errorsz
        console.log(error);

        return [];
    }
}
export default fetchApiData;