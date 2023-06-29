import apiUrl from "./config";

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
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('user', JSON.stringify(data.user));

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
