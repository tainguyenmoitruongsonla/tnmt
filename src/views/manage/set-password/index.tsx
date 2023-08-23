import React, { useState } from 'react';
import axios from 'axios';

function ChangePasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const model = {};

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/set-password`, {
                modle: model,
                newPassword: newPassword,
            });

            console.log(response.data.message); // Display success or error message
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Input fields for 'modle' (UserModel) data */}
            {/* ... */}
            <button type="submit">Change Password</button>
        </form>
    );
}

export default ChangePasswordForm;
