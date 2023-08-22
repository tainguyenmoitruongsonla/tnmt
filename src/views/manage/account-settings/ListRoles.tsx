// ** React Imports
import { useEffect, useState } from 'react';

// ** Icons Imports
import { Delete } from '@mui/icons-material';

// ** MUI Imports
import { IconButton, Box, Checkbox } from '@mui/material';
import TableComponent from 'src/@core/components/table';
import FormRoles from './FormRoles';
import fetchData from 'src/api/fetch';


const ListRoles = () => {

  const [postSuccess, setPostSuccess] = useState(false);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const columnsTable = [
    { id: 'name', label: 'Tên', },
    { id: 'isDefault', label: 'Mặc định', elm: (row: any) => (<Checkbox name='isDefault' checked={row?.isDefault} />) },
    { id: 'actions', label: '#', elm: (row: any) => (<># <FormRoles data={row} isEdit={false} setPostSuccess={handlePostSuccess} /> </>) }
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await fetchData('Role/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false)
      }
    };

    getData();
  }, [postSuccess]);

  return (
    <>
      <TableComponent columns={columnsTable} data={resData} loading={loading}
        actions={(row: any) => (
          <Box display="flex" justifyContent="center">
            <IconButton aria-label="edit">
              <FormRoles data={row} isEdit={true} setPostSuccess={handlePostSuccess} />
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
