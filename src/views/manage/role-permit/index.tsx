// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import { IconButton, Box } from '@mui/material';

// ** Component Imports
import TableComponent from 'src/@core/components/table';
import fetchData from 'src/api/fetch';

import AssignPermit from './assign-permit';
import AssignFunction from './assign-function';

const RolePermit = () => {

  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columnsTable = [
    { id: 'name', label: 'Tên nhóm người dùng', elm: (row: any) => (<AssignFunction data={row} />) },
    { id: 'description', label: 'Mô tả', },
    { id: 'actions', label: '#', }
  ]

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
      <TableComponent columns={columnsTable} data={resData} loading={loading}
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

export default RolePermit;
