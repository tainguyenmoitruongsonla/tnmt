import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TableComponent from "src/@core/components/table";
import licensedischargeData from "src/api/license/xathai";



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

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://tnnsl.loc/api/Construction/list?BasinId=0&CommuneId=0&DistrictId=0&Keyword=&LicenseId=-1&LicensingAuthorities=-1&PageIndex=1&PageSize=0&ProvinceId=0&StartDate=-1&Status=true&TypeOfConstructionId=1'); // Thay đổi URL API tùy thuộc vào nguồn dữ liệu của bạn
  //     const jsonData = await response.json();
  //     console.log(jsonData.ListData)
  //     setData(jsonData.ListData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }; 

    useEffect(() => {
    setData(licensedischargeData);
    setColumns(columnsTable);

    // fetchData();
  }, []);

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>Tài khoản kết nối đến công trình</Typography>
      </legend>
      <TableComponent columns={columns} data={data}/>
    </fieldset>)
    
  
}

export default RequestTableDetails
