import jwt_decode from 'jwt-decode';

interface DecodedToken {
    [key: string]: any;
}


export const shouldShow = (itemPath: string | undefined) => {

    if (typeof localStorage !== 'undefined') {

        const token = localStorage.getItem('authToken') || '';

        if (token) {
            const decodedToken = jwt_decode(token) as DecodedToken;

            const permits = decodedToken['Permission'].map((e: any) => {
                return JSON.parse(e);
            })

            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            if (role === 'Admin') {
                return true;
            } else {
                // Use Array.prototype.some to check if any permit matches the condition
                return permits.some((permit: any) => {
                    return itemPath === undefined || (itemPath === permit.dashSrc && permit.funcCode === "View");
                });
            }
        }
    }
};