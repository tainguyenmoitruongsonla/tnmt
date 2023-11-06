import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TableComponent from "src/@core/components/table";



// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  { id: '#', label: 'Địa chỉ FTP'},
  { id: '#', label: 'Tài khoản'},
  { id: '#', label: 'Mật khẩu'},
  { id: '#', label: 'Đường dẫn Camera'},
  { id: '#', label: 'Giao thức truyền'},
  { id: '#', label: 'Cổng kết nối FTP'},
];

const RequestTableDetails = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

    useEffect(() => {
    setData([]);
    setColumns(columnsTable);

    // fetchData();
  }, []);

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>Tài khoản kết nối đến công trình</Typography>
      </legend>
      <TableComponent columns={columns} rows={data}/>
    </fieldset>)
    
  
}

export default RequestTableDetails
