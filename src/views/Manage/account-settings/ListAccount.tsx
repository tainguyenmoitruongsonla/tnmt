// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import { IconButton, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';

// ** Component Imports
import SetRole from './SetRole';
import ChangePassword from './ChangePassword';
import EditAccount from './EditAccount';
import TableComponent from 'src/@core/components/table';
import fetchApiData from 'src/api/fetch';
import Loading from 'src/@core/components/loading';

const ListAccount = () => {

    const [postSuccess, setPostSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    const columnsTable = [
        { id: 'userName', label: 'Tài khoản(User name)', },
        { id: 'roles.name', label: 'Quyền hạn(Roles)', },
        { id: 'fullName', label: 'Họ tên(Full Name)', },
        { id: 'email', label: 'Email', },
        { id: 'phoneNumber', label: 'Số điện thoại(Phone Number)', },
        { id: 'actions', label: '#', elm: (row: any) => (<># <EditAccount data={row} setPostSuccess={handlePostSuccess} isEdit={false} /></>) }
    ]

    const [resData, setResData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchApiData('User/list');
                setResData(data);
            } catch (error) {
                setResData([]);
            }
            setIsLoading(false)
        };

        fetchData();
    }, [postSuccess]);

    return (
        <div>
            <Loading isLoading={isLoading} />
            <TableComponent columns={columnsTable} data={resData}
                actions={(row: any) => (
                    <Box>
                        <IconButton aria-label="setRole">
                            <SetRole data={row} setPostSuccess={handlePostSuccess} />
                        </IconButton>
                        <IconButton aria-label="changePasword">
                            <ChangePassword />
                        </IconButton>
                        <IconButton aria-label="edit">
                            <EditAccount data={row} setPostSuccess={handlePostSuccess} isEdit={true} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <Delete className='tableActionBtn deleteBtn' />
                        </IconButton>
                    </Box>
                )

                } />
        </div>
    );

}

export default ListAccount;
