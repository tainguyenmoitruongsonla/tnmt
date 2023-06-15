// ** MUI Imports
import { Grid, Box, Button, Autocomplete, TextField, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react'

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';
import { EditNote, Delete } from "@mui/icons-material";

// ** Components Imports
import ConstructionMap from 'src/views/construction'
import CreateConstruction from 'src/views/construction/CreateConstruction';
import SearchLicense from 'src/views/license/Search';
import CountLicense from 'src/views/license/CountLicense';
import TableLicenseComponent from 'src/@core/components/table/table-license';


const complete1 = [
  {title: "Khóa 1", value: 1},
  {title: "Khóa 2", value: 2},
  {title: "Khóa 3", value: 3},
];
const complete2 = [
  {title: "Đợt 1"},
  {title: "Đợt 2"},
  {title: "Đợt 3"},
];

const data:any = [
  {
    "LicenseNumber": "ABCX",
    "License_Fk": {
      "Id": 1,
      "License":{
        "LicenseId": 64,
        "LicenseParentId": 1,
        "LicenseFeeId": 123132,
        "LicensingTypeId": 5,
      },
      "BasinId": 4,
      "BusinessId": 24,
      "Location": {
        "DistrictId": 12,
        "CommuneId": 196,
      },
      "ConstructionId": 1,
      "TypeOfConstructionId": 4,
      "AquiferId": 123132,
    }
  },
  {
    "LicenseNumber": "ASSZ",
    "License_Fk": {
      "Id": 1,
      "License":{
        "LicenseId": 64,
        "LicenseParentId": 1,
        "LicenseFeeId": 123132,
        "LicensingTypeId": 5,
      },
      "BasinId": 4,
      "BusinessId": 24,
      "Location": {
        "DistrictId": 12,
        "CommuneId": 196,
      },
      "ConstructionId": 1,
      "TypeOfConstructionId": 4,
      "AquiferId": 123132,
    }
  },
  {
    "LicenseNumber": "UBNDS",
    "License_Fk": {
      "Id": 1,
      "License":{
        "LicenseId": 64,
        "LicenseParentId": 1,
        "LicenseFeeId": 123132,
        "LicensingTypeId": 5,
      },
      "BasinId": 4,
      "BusinessId": 24,
      "Location": {
        "DistrictId": 12,
        "CommuneId": 196,
      },
      "ConstructionId": 1,
      "TypeOfConstructionId": 4,
      "AquiferId": 123132,
    }
  },
  {
    "LicenseNumber": "BTNMS",
    "License_Fk": {
      "Id": 1,
      "License":{
        "LicenseId": 64,
        "LicenseParentId": 1,
        "LicenseFeeId": 123132,
        "LicensingTypeId": 5,
      },
      "BasinId": 4,
      "BusinessId": 24,
      "Location": {
        "DistrictId": 12,
        "CommuneId": 196,
      },
      "ConstructionId": 1,
      "TypeOfConstructionId": 4,
      "AquiferId": 123132,
    }
  },
]

// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  { id: 'LicenseNumber', label: 'LicenseNumber', showId:[1], rowspan: 2 },
  { id: 'License_Fk.Id', label: 'Id', showId:[1], rowspan: 2 },
  { id: 'License_Fk.License', label: 'License', showId:[1], colspan:4, children: [
    { id: 'LicenseParentId', label: 'LicenseParentId'},
    { id: 'LicenseId', label: 'LicenseId'},
    { id: 'LicenseFeeId', label: 'LicenseFeeId'},
    { id: 'LicensingTypeId', label: 'LicensingTypeId'},
  ] },
  { id: 'License_Fk.BasinId', label: 'BasinId' , showId:[1,2], rowspan: 2 },
  { id: 'License_Fk.BusinessId', label: 'BusinessId', showId:[1,2], rowspan: 2 },
  { id: 'License_Fk.Location', label: 'Location', showId:[1], colspan:2, children: [
    { id: 'DistrictId', label: 'DistrictId', showId:[1,2] },
    { id: 'CommuneId', label: 'CommuneId', showId:[1,2] },
  ] },
  { id: 'License_Fk.ConstructionId', label: 'ConstructionId', showId:[1,2], rowspan: 2 },
  { id: 'License_Fk.TypeOfConstructionId', label: 'TypeOfConstructionId', showId:[1,2], rowspan: 2 },
  { id: 'License_Fk.AquiferId', label: 'AquiferId', showId:[1,2], rowspan: 2 },
];

const SurfaceWater = () => {
  const [TypeOfConsId, setTypeOfConsId] = useState([1]);
  const handleChange = (e:any) => {
    const val = (e == 123132 ? 1 : e.value) 
    setTypeOfConsId(val)
  }

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={3} sm={3} md={3}>
        <CountLicense />
       </Grid>
       <Grid item xs={9} sm={9} md={9} sx={{height:'55vh', overflow:'hidden'}}>
        <Card sx={{height: '100%'}}>
          <CardContent sx={{p: 0, height: '100%'}}>
            <ConstructionMap />
          </CardContent>
        </Card>
       </Grid>
       <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
          <Box></Box>
          <Box className='_search'>
            <Box>
              <Autocomplete  size="small" 
              onChange={(e,v) => handleChange(v)}
              options={complete1} 
              getOptionLabel={(option) => option.title} renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Chọn loại hình CP"
                    placeholder=""
                  />
                )}
              />
            </Box>
            <Box>
              <Autocomplete size="small" options={complete2} getOptionLabel={(option) => option.title} renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Chọn cơ quan CP"
                    placeholder=""
                  />
                )}
              />
            </Box>
            <Box>
              <SearchLicense/>
            </Box>           
            <Box>
              <Button size='small' startIcon={<SearchIcon/>} variant="outlined">Xuất excel</Button>
            </Box>
            <Box>
              <CreateConstruction isEdit={false}/>
            </Box>
          </Box>
        </Grid> 
       <Grid item xs={12} sm={12} md={12}>
          <TableLicenseComponent columns={columnsTable} data={data} TypeOfConsId={TypeOfConsId} 
            actions={
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Tooltip title="Chỉnh sửa giấy phép">
                    <IconButton>
                      <EditNote className='tableActionBtn' />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Xóa giấy phép">
                    <IconButton>
                      <Delete className='tableActionBtn deleteBtn' />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            } />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
