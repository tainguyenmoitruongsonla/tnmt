// ** React Imports

// ** MUI Imports
import { IconButton, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import SetRole from './SetRole';
import ChangePassword from './ChangePassword';
import EditAccount from './EditAccount';
import TableComponent from 'src/@core/components/table';
import { useEffect, useState } from 'react';
import fetchApiData from 'src/api/fetchApiData';

const ListAccount = () => {

    const [postSuccess, setPostSuccess] = useState(false);

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

    const columnsTable = [
        { id: 'userName', label: 'Tài khoản', },
        { id: 'roles', label: 'Vai trò', },
        { id: 'fullName', label: 'Họ tên', },
        { id: 'email', label: 'Email', },
        { id: 'phoneNumber', label: 'Số điện thoại', },
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
        };

        fetchData();
    }, [postSuccess]);

    return (
        <TableComponent columns={columnsTable} data={resData}
            actions={(row: any) => (
                <Box>
                    <IconButton aria-label="setRole">
                        <SetRole data={row} />
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
    );

}

export default ListAccount;
