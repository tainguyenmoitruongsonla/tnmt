// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import { IconButton, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';

// ** Component Imports
import SetRole from './AssignRole';
import ChangePassword from './ChangePassword';
import EditAccount from './EditAccount';
import TableComponent from 'src/@core/components/table';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';

const ListAccount = () => {

  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  if (loading == true) {
    showLoading();
  } else {
    hideLoading();
  }
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const columnsTable = [
    { id: 'userName', label: 'Tài khoản(User name)', },
    { id: 'roles', label: 'Quyền hạn(Roles)', elm: (row: any) => (row.role) },
    { id: 'fullName', label: 'Họ tên(Full Name)', },
    { id: 'email', label: 'Email', },
    { id: 'phoneNumber', label: 'Số điện thoại(Phone Number)', },
    { id: 'actions', label: '#', elm: (row: any) => (<># <EditAccount data={row} setPostSuccess={handlePostSuccess} isEdit={false} /></>) }
  ]

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await fetchData('User/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      setLoading(false)
    };

    getData();
  }, [postSuccess]);

  return (
    <div>
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
