// ** React Imports

// ** MUI Imports
import { IconButton, Box, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import TableComponent from 'src/@core/components/table';
import { useEffect, useState } from 'react';
import fetchApiData from 'src/api/fetchApiData';
import EditRoles from './EditRoles';

const ListRoles = () => {

  const [postSuccess, setPostSuccess] = useState(false);

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const columnsTable = [
    { id: 'name', label: 'Tên', },
    { id: 'isDefault', label: 'Mặc định', elm: (row: any) => (<Checkbox name='isDefault' checked={row?.isDefault} />) },
    { id: 'actions', label: '#', elm: (row: any) => (<># <EditRoles data={row} isEdit={false} setPostSuccess={handlePostSuccess} /> </>) }
  ]

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApiData('Role/list');
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
  );

}

export default ListRoles;
