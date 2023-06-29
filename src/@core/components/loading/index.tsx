import React from 'react';
import { Backdrop, Typography } from '@mui/material';

const Loading = ({ isLoading }: any) => {

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <div className='loader'></div>
            </Backdrop>
        </div>
    );
};

export default Loading;
