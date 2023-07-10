// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import { IconButton, Box } from '@mui/material';

// ** Component Imports
import TableComponent from 'src/@core/components/table';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import AssignPermit from './assign-permit';
import AssignFunction from './assign-function';

const UserPermit = () => {

  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  if (loading == true) {
    showLoading();
  } else {
    hideLoading();
  }

  const columnsTable = [
    { id: 'name', label: 'Tên nhóm người dùng', elm: (row: any) => (<AssignFunction data={row} />) },
    { id: 'description', label: 'Mô tả', },
    { id: 'actions', label: '#', }
  ]

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await fetchData('Role/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      setLoading(false)
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
