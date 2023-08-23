import apiUrl from "./config";

const fetchData = async (url: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {

      if (response.status === 204) {
        // Empty response, return an empty object
        return [];
      } else {
        const data = await response.json();

        return data;
      }
    } else {
      // Handle non-200 status code
      const errorData = await response.text();

      throw new Error(errorData);
    }
  } catch (error) {
    // Handle fetch or parsing errors
    console.log(error);

    return [];
  }
}
export default fetchData;