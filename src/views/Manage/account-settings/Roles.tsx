// ** React Imports
import { useContext, useEffect, useState } from 'react';

// ** Icons Imports
import { Delete } from '@mui/icons-material';

// ** MUI Imports
import { IconButton, Box, Checkbox } from '@mui/material';
import TableComponent from 'src/@core/components/table';
import EditRoles from './EditRoles';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';

const ListRoles = () => {

  const [postSuccess, setPostSuccess] = useState(false);
  const [resData, setResData] = useState([]);
  const { showLoading, hideLoading } = useLoadingContext();

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const columnsTable = [
    { id: 'name', label: 'Tên', },
    { id: 'isDefault', label: 'Mặc định', elm: (row: any) => (<Checkbox name='isDefault' checked={row?.isDefault} />) },
    { id: 'actions', label: '#', elm: (row: any) => (<># <EditRoles data={row} isEdit={false} setPostSuccess={handlePostSuccess} /> </>) }
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        const data = await fetchData('Role/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      hideLoading();
    };

    getData();
  }, [postSuccess]);

  return (
    <>
      <TableComponent columns={columnsTable} data={resData}
        actions={(row: any) => (
          <Box display="flex" justifyContent="center">
            <IconButton aria-label="edit">
              <EditRoles data={row} isEdit={true} setPostSuccess={handlePostSuccess} />
            </IconButton>
            <IconButton aria-label="delete">
              <Delete className='tableActionBtn deleteBtn' />
            </IconButton>
          </Box>
        )

        } />
    </>
  );
}

export default ListRoles;
