// ** React Imports
import { useEffect, useState } from 'react';

// ** Icons Imports
import { Delete } from '@mui/icons-material';

// ** MUI Imports
import { IconButton, Box, Checkbox } from '@mui/material';
import TableComponent from 'src/@core/components/table';
import fetchApiData from 'src/api/fetch';
import EditRoles from './EditRoles';
import Loading from 'src/@core/components/loading';

const ListRoles = () => {

  const [postSuccess, setPostSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false)
    };

    fetchData();
  }, [postSuccess]);

  return (
    <>
      <Loading isLoading={isLoading} />
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
