// ** MUI Imports
import { Grid, Box, Button, Autocomplete, TextField, Card, CardContent } from '@mui/material';
import { useEffect } from 'react'

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import ConstructionMap from 'src/views/construction'
import CreateConstruction from 'src/views/construction/CreateConstruction';
import SearchLicense from 'src/views/license/Search';
import CountLicense from 'src/views/license/CountLicense';
import TableExploidGroundWater from 'src/views/license/Table/ExploidGroundWater';


const complete1 = [
  {title: "Khóa 1"},
  {title: "Khóa 2"},
  {title: "Khóa 3"},
];
const complete2 = [
  {title: "Đợt 1"},
  {title: "Đợt 2"},
  {title: "Đợt 3"},
];

const data = [
  {
      "Construction": {
          "ProvinceName": null,
          "DistrictName": null,
          "CommuneName": null,
          "ConstructionItems": [
              {
                  "Id": 280,
                  "ConstructionId": 119,
                  "AquiferId": null,
                  "Name": "GK",
                  "Location": "",
                  "X": 2305131.0,
                  "Y": 571203.0,
                  "Lat": null,
                  "Lng": null,
                  "WaterSupplyFlow": null,
                  "WaterDepthFrom": null,
                  "WaterDepthTo": null,
                  "DepthFilterTubeFrom": 30.0,
                  "DepthFilterTubeTo": 75.0,
                  "StaticWL": 8.0,
                  "DynamicWL": 13.0,
                  "MiningMaxFlow": null,
                  "MiningMode": "6-8",
                  "AmountWaterExploited": 500.0,
                  "PumpCapacity": null,
                  "MaximumWasteWaterFlow": null,
                  "AverageDischargeFlow": null,
                  "KqKf": null,
                  "DischargeWS": null,
                  "DischargeMethod": null,
                  "DischargeMode": null,
                  "Description": "",
                  "LowWL": null
              }
          ],
          "ParentConstructionId": 2,
          "ParentConstructionType": "NƯỚC DƯỚI ĐẤT",
          "ParentTypeSlug": "nuocduoidat",
          "ConstructionTypeName": "Khai thác",
          "TypeSlug": "khaithac",
          "License": null,
          "LicenseFee": null,
          "Inspection": [],
          "Commune": null,
          "licenseDuration": null,
          "licenseIssueDate": null,
          "LicenseFile": null,
          "licensingAuthorities": 0,
          "licenseNumber": null,
          "licenseName": null,
          "RiverName": null,
          "BasinName": "Sông Sập Vạt và phụ cận",
          "OperatingStatus": 1,
          "AquiferName": "Tầng chứa nước khe nứt, khe nứt Karst, các trầm tích carbonat, hệ Trias thống trung, bậc Asini hệ tầng Đồng Giao t2",
          "Business": {
              "Id": 68,
              "Name": "Công ty cổ phần giống bò sữa Mộc Châu",
              "Address": "Tiểu khu Cơ Quan,  thị trấn Nông trường Mộc Châu,  huyện Mộc Châu,  tỉnh Sơn La",
              "IdentifierCode": null,
              "Phone": null,
              "Fax": null,
              "Email": null,
              "Director": null,
              "AuthorityPerson": null,
              "LegalRepresentative": null,
              "UserName": null,
          },
          "Id": 119,
          "TypeOfConstructionId": 8,
          "ProvinceId": 1,
          "DistrictId": 10,
          "CommuneId": 113,
          "BasinId": 4,
          "LicenseId": 146,
          "AquiferId": 14,
          "UserName": "ndd.nmsuamocchau",
          "LicenseNumber": "2864/QĐ-UBND",
          "TOConsName": null,
          "ConstructionName": "Nhà máy sữa Mộc Châu",
          "Name": "Nhà máy sữa Mộc Châu",
          "ConstructionCode": "NDDNMSUAMOCCHAU",
          "ConstructionLocation": "Tiểu khu Cơ Quan, thị trấn Nông trường, huyện Mộc Châu, tỉnh Sơn La",
          "X": 2305131.0,
          "Y": 571203.0,
          "Lat": 20.89222222,
          "Lng": 104.6936111,
          "StartDate": null,
          "ExploitedWS": null,
          "MiningMode": "6-8h/ngày",
          "MiningMethod": null,
          "MiningPurpose": "Cấp nước cho sản xuất của NM sữa Mộc Châu và sh, ăn uống của cán bộ, nv trong cty",
          "DischargeMethod": null,
          "DischargeMode": null,
          "DischargeWS": null,
          "DischargeFlow": null,
          "MaximumDischargeFlow": null,
          "MiningMaxFlow": null,
          "MaximumFlow": null,
          "MinimumFlow": null,
          "MaximumWasteWaterFlow": null,
          "Power": null,
          "PumpCapacity": null,
          "OverflowFlow": null,
          "RiseWL": null,
          "DeadWL": null,
          "PreFlootMaxWL": null,
          "FlootWL": null,
          "UpstreamWL": null,
          "DownstreamWL": null,
          "DeadCapacity": null,
          "UsefulCapacity": null,
          "TotalCapacity": null,
          "DamHeight": null,
          "DamWidth": null,
          "DrainElevation": null,
          "DrainLength": null,
          "DrainDiameter": null,
          "DrainSize": null,
          "PumpNumber": null,
          "PumpDesignFlow": null,
          "PumpMaxFlow": null,
          "SuctionTankWL": null,
          "WaterSupplyFlow": null,
          "MiningDuration": "15",
          "DrillingDuration": null,
          "DrillingPurpose": null,
          "ExplorationPurposes": null,
          "DrillingScale": null,
          "ConstructionTime": null,
          "DesignFloodLevel": null,
          "CheckFloodWL": null,
          "NumberMiningWells": 1.0,
          "AmountWaterExploited": 500.0,
          "NumberMonitoringWells": 1.0,
          "Description": null,
          "WellNumber": null,
          "MonitoringWellWL": null,
          "WellWL": null,
          "WaterDepthFrom": null,
          "WaterDepthTo": null,
          "LowWL": null,
          "StaticWL": null,
          "DynamicWL": null,
          "VolumeOfExplorationItems": null,
          "WaterExtractionFlowDesign": null,
          "WaterExtractionFlowReality": null,
          "ConstructionDetailLocation": null,
          "RealityWateringArea": null,
          "WateringAreaDesigned": null,
          "GuaranteedFlow": null,
          "Hmax": null,
          "Hmin": null,
          "Htt": null,
          "RealityFlow": null,
          "FlowDesigned": null,
          "FlowAvgForYears": null,
          "RainAvgForYears": null,
          "BasinArea": null,
          "AverageDischargeFlow": null,
          "SmallPlanningArea": null,
          "GuaranteedPower": null,
          "ConstructionLevel": null,
          "KqKf": null,
          "DamElevation": null,
          "AveragePumpTime": null,
          "MaximumPumpTime": null,
          "MinimumPumpTime": null,
          "MaximumDischargeFlowPre": null,
          "CapacityPre": null,
          "DownstreamWLPre": null,
          "UpstreamWLPre": null,
          "MinimumFlowPre": null,
          "MaximumFlowPre": null,
          "TimePre": null,
      },
      "Business": {
          "License": {
              "Construction": null,
              "Business": null,
              "MiningPurpose": null,
              "LicenseType": "Cấp mới giấy phép",
              "TypeSlug": null,
              "LicenseFee": null,
              "ConstructionType": null,
              "ParentConstructionId": 2,
              "ParentConstructionType": null,
              "TypeOfConstructionId": 8,
              "LicensingAuthoritiesName": null,
              "LicenseTypeName": null,
              "OldLicense": null,
              "License_Fk": null,
              "Location": null,
              "MiningPurposes": null,
              "Id": 101,
              "LicenseName": "Giấy phép khai thác - sử dụng nước dưới đất",
              "LicenseNumber": "1733/GP-UBND",
              "SignDate": "2012-08-13T00:00:00",
              "IssueDate": "2012-08-13T00:00:00",
              "ExpireDate": "2027-08-13T00:00:00",
              "Duration": "15 năm",
              "LicenseHolderName": "Công ty cổ phần giống bò sữa Mộc Châu",
              "LicenseHolderAddress": "Tiểu khu Cơ Quan , thị trấn Nông trường , huyện Mộc Châu , tỉnh Sơn La",
              "LicensingAuthorities": 1,
              "LicenseFile": "1733_UBND_2012.pdf",
              "RelatedDocumentFile": null,
              "LicenseRequestFile": null,
              "IsRevoked": false,
          },
          "Id": 68,
          "Name": "Công ty cổ phần giống bò sữa Mộc Châu",
          "Address": "Tiểu khu Cơ Quan,  thị trấn Nông trường Mộc Châu,  huyện Mộc Châu,  tỉnh Sơn La",
          "IdentifierCode": null,
          "Phone": null,
          "Fax": null,
          "Email": null,
          "Director": null,
          "AuthorityPerson": null,
          "LegalRepresentative": null,
          "UserName": null,
      },
      "MiningPurpose": null,
      "LicenseType": "Cấp mới giấy phép",
      "TypeSlug": "khaithac",
      "LicenseFee": {
          "Licenses": null,
          "Constructions": null,
          "LicensingAuthoritiesName": "Ủy ban nhân dân Tỉnh",
          "License_FK": null,
          "LicenseTypeId": 0,
          "SupplementLicenseFee": null,
          "Id": 72,
          "ChildrenId": 0,
          "LicenseFeeNumber": "2699/QĐ-UBND",
          "SignDate": "2017-10-18T00:00:00",
          "LicensingAuthorities": 1,
          "TotalMoney": 190785000.0,
          "FilePDF": "2699_QĐ-UBND.pdf",
          "ModifiedTime": "2023-04-05T17:31:48.903",
      },
      "ConstructionType": "Khai thác",
      "ParentConstructionId": 2,
      "ParentConstructionType": "khaithac",
      "TypeOfConstructionId": 8,
      "LicensingAuthoritiesName": "Ủy ban nhân dân Tỉnh",
      "LicenseTypeName": "Cấp mới",
      "OldLicense": null,
      "License_Fk": {
          "Id": 101,
          "LicenseId": 101,
          "LicenseParentId": 0,
          "BasinId": null,
          "BusinessId": 68,
          "DistrictId": 10,
          "CommuneId": 113,
          "ConstructionId": 119,
          "LicenseFeeId": 72,
          "LicensingTypeId": 1,
          "TypeOfConstructionId": 8,
          "AquiferId": 13,
      },
      "Location": {
          "Id": 113,
          "CityName": "Tỉnh Sơn La",
          "CityId": "14",
          "DistrictName": "Huyện Mộc Châu",
          "DistrictId": "10",
          "CommuneName": "Thị trấn NT Mộc Châu",
          "CommuneId": "03982",
          "CommuneLevel": "Thị trấn",
          "DisplayOrder": null,
      },
      "MiningPurposes": [],
      "Id": 101,
      "LicenseName": "Giấy phép khai thác - sử dụng nước dưới đất",
      "LicenseNumber": "1733/GP-UBND",
      "SignDate": "2012-08-13T00:00:00",
      "IssueDate": "2012-08-13T00:00:00",
      "ExpireDate": "2027-08-13T00:00:00",
      "Duration": "15 năm",
      "LicenseHolderName": "Công ty cổ phần giống bò sữa Mộc Châu",
      "LicenseHolderAddress": "Tiểu khu Cơ Quan , thị trấn Nông trường , huyện Mộc Châu , tỉnh Sơn La",
      "LicensingAuthorities": 1,
      "LicenseFile": "1733_UBND_2012.pdf",
      "RelatedDocumentFile": null,
      "LicenseRequestFile": null,
      "IsRevoked": false,
  }
]
console.log(data)
const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin giấy phép nước mặt";
  }, []);

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
          <Box className='_search'>
            <Box>
              <Autocomplete  size="small" options={complete1} getOptionLabel={(option) => option.title} renderInput={(params) => (
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
          <TableExploidGroundWater data={data} />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
