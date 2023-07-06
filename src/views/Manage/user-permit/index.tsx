// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import { IconButton, Box } from '@mui/material';

// ** Component Imports
import TableComponent from 'src/@core/components/table';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import AssignPermit from './assign-permit';

const UserPermit = () => {

  const { showLoading, hideLoading } = useLoadingContext();

  const columnsTable = [
    { id: 'fullName', label: 'Họ tên(Full Name)', },
    { id: 'userName', label: 'Tài khoản(User name)', },
    { id: 'email', label: 'Email', },
    { id: 'actions', label: '#', }
  ]

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        const data = await fetchData('User/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      hideLoading();
    };

    getData();
  }, []);

  return (
    <div>
      <TableComponent columns={columnsTable} data={resData}
        actions={(row: any) => (
          <Box>
            <IconButton>
              <AssignPermit data={row} />
            </IconButton>
          </Box>
        )

        } />
    </div>
  );

}

export default UserPermit;
