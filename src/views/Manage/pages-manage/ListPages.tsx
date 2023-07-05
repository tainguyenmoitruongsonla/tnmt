// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { IconButton, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditPages from './EditPages';
import TableComponent from 'src/@core/components/table';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import fetchData from 'src/api/fetch';

const ListPages = () => {

  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const columnsTable = [
    { id: 'name', label: 'Tên trang web', },
    { id: 'path', label: 'Đường dẫn', },
    { id: 'description', label: 'Mô tả', },
    { id: 'actions', label: '#', elm: (row: any) => (<># <EditPages data={row} setPostSuccess={handlePostSuccess} isEdit={false} /></>) }
  ]

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      showLoading();
      try {
        const data = await fetchData('Dashboard/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      hideLoading();
    };
    getData();
  }, [postSuccess]);

  return (
    <TableComponent columns={columnsTable} data={resData}
      actions={(row: any) => (
        <Box>
          <IconButton aria-label="edit">
            <EditPages data={row} setPostSuccess={handlePostSuccess} isEdit={true} />
          </IconButton>
          <IconButton aria-label="delete">
            <Delete className='tableActionBtn deleteBtn' />
          </IconButton>
        </Box>
      )

      } />
  );
}

export default ListPages;
