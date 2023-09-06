import apiUrl from "./config";
import jwt_decode from 'jwt-decode';

interface DecodedToken {

    // Define the properties you need here
    [key: string]: any;
}


const loginApi = async (username: string, password: string) => {
    try {
        const response = await fetch(`${apiUrl}/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const token = await response.json();

            localStorage.setItem('authToken', token);

            const decodedToken = jwt_decode(token) as DecodedToken;

            // const permit = decodedToken['Permission'].map((e: any) => {
            //     return JSON.parse(e);
            // })

            // localStorage.setItem('permit', JSON.stringify(permit));

            const userInfo = {
                fullName: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                userName: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                userRole: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            return true;
        } else {

            // Handle non-200 status code
            throw new Error('Login failed');
        }
    } catch (error) {

        // Handle fetch or parsing errors
        console.log(error);
    }
};

export default loginApi;
