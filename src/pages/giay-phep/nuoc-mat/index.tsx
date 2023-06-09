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
import TableSurfaceWater from 'src/views/license/Table/SurfaceWater';


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
                  "Id": 1,
                  "ConstructionId": 1,
                  "AquiferId": null,
                  "Name": "Điểm trung tâm đập thủy điện",
                  "Location": "",
                  "X": 2305544.0,
                  "Y": 585369.0,
                  "Lat": 21.834444,
                  "Lng": 104.8125,
                  "WaterSupplyFlow": null,
                  "WaterDepthFrom": null,
                  "WaterDepthTo": null,
                  "DepthFilterTubeFrom": null,
                  "DepthFilterTubeTo": null,
                  "StaticWL": null,
                  "DynamicWL": null,
                  "MiningMaxFlow": null,
                  "MiningMode": null,
                  "AmountWaterExploited": null,
                  "PumpCapacity": null,
                  "MaximumWasteWaterFlow": null,
                  "AverageDischargeFlow": null,
                  "KqKf": null,
                  "DischargeWS": null,
                  "DischargeMethod": null,
                  "DischargeMode": null,
                  "Description": "",
                  "Status": true,
                  "LowWL": null
              },
              {
                  "Id": 2,
                  "ConstructionId": 1,
                  "AquiferId": null,
                  "Name": "Điểm xả nước nhà máy thủy điện",
                  "Location": "",
                  "X": 2306185.0,
                  "Y": 586097.0,
                  "Lat": 21.84654,
                  "Lng": 104.829199,
                  "WaterSupplyFlow": null,
                  "WaterDepthFrom": null,
                  "WaterDepthTo": null,
                  "DepthFilterTubeFrom": null,
                  "DepthFilterTubeTo": null,
                  "StaticWL": null,
                  "DynamicWL": null,
                  "MiningMaxFlow": null,
                  "MiningMode": null,
                  "AmountWaterExploited": null,
                  "PumpCapacity": null,
                  "MaximumWasteWaterFlow": null,
                  "AverageDischargeFlow": null,
                  "KqKf": null,
                  "DischargeWS": null,
                  "DischargeMethod": null,
                  "DischargeMode": null,
                  "Description": "",
                  "Status": true,
                  "LowWL": null
              }
          ],
          "ParentConstructionId": 1,
          "ParentConstructionType": "NƯỚC MẶT",
          "ParentTypeSlug": "nuocmat",
          "ConstructionTypeName": "Thủy điện",
          "TypeSlug": "thuydien",
          "License": null,
          "LicenseFee": null,
          "Inspection": [
              {
                  "Id": 1,
                  "ConstructionId": 1,
                  "DecisionNumber": "828/KL-STNMT",
                  "InspectionName": null,
                  "InspectionUnit": "Đoàn Thanh Tra",
                  "InspectionDate": "2017-12-10T20:00:00",
                  "Fines": null,
                  "FilePDF": "828-KL_STNMT_2017.pdf",
                  "Description": "Việc chấp hành pháp luật về tài nguyên nước, bảo vệ môi trường đất, đai đối với Công tỷ cổ phần thủy điện Nậm Lừm",
                  "Status": true,
              }
          ],
          "Commune": null,
          "licenseDuration": null,
          "licenseIssueDate": null,
          "LicenseFile": null,
          "licensingAuthorities": 0,
          "licenseNumber": null,
          "licenseName": null,
          "RiverName": "Sông Đà",
          "BasinName": "Sông Sập Vạt và phụ cận",
          "OperatingStatus": 1,
          "AquiferName": null,
          "Business": {
              "Id": 24,
              "Name": "Công ty cổ phần thủy điện Suối Tân",
              "Address": "P4, nhà 12, tập thể Đại học Thủy Lợi, phường Trung Liệt, quận Đống Đa, thành phố Hà Nội",
              "IdentifierCode": "0103005754",
              "Phone": null,
              "Fax": null,
              "Email": null,
              "Director": null,
              "AuthorityPerson": null,
              "LegalRepresentative": null,
              "UserName": null,
              "Status": true,
          },
          "Id": 1,
          "TypeOfConstructionId": 4,
          "ProvinceId": 1,
          "DistrictId": 12,
          "CommuneId": 196,
          "RiverId": 135,
          "BasinId": 4,
          "LicenseId": 64,
          "AquiferId": 0,
          "UserName": "td.suoitan",
          "LicenseNumber": "2408/GP-UBND",
          "TOConsName": null,
          "ConstructionName": "Thủy điện Suối Tân",
          "Name": "Suối Tân",
          "ConstructionCode": "TDSUOITAN",
          "ConstructionLocation": "xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La",
          "X": 2305544.0,
          "Y": 585369.0,
          "Lat": 20.8213,
          "Lng": 104.944,
          "StartDate": null,
          "ExploitedWS": "Suối Tân",
          "MiningMode": "Điều tiết ngày đêm",
          "MiningMethod": null,
          "MiningPurpose": "Phát điện",
          "DischargeMethod": null,
          "DischargeMode": null,
          "DischargeWS": null,
          "DischargeFlow": null,
          "MaximumDischargeFlow": null,
          "MiningMaxFlow": null,
          "MaximumFlow": null,
          "MinimumFlow": null,
          "MaximumWasteWaterFlow": null,
          "Power": 2.0,
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
          "MiningDuration": null,
          "DrillingDuration": null,
          "DrillingPurpose": null,
          "ExplorationPurposes": null,
          "DrillingScale": null,
          "ConstructionTime": null,
          "DesignFloodLevel": null,
          "CheckFloodWL": null,
          "NumberMiningWells": null,
          "AmountWaterExploited": null,
          "NumberMonitoringWells": null,
          "Description": "trước ngày 10/6/2013 thuộc xã Chiềng Khoa - huyện Mộc Châu - tỉnh Sơn La",
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
          "GuaranteedPower": 0.41,
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
          "Status": true,
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
              "ParentConstructionId": 1,
              "ParentConstructionType": null,
              "TypeOfConstructionId": 4,
              "LicensingAuthoritiesName": null,
              "LicenseTypeName": null,
              "OldLicense": null,
              "License_Fk": null,
              "Location": null,
              "MiningPurposes": null,
              "Id": 1,
              "LicenseName": "Giấy phép khai thác sử dụng nước mặt",
              "LicenseNumber": "86/GP-UBND",
              "SignDate": "2005-05-04T00:00:00",
              "IssueDate": "2006-06-18T00:00:00",
              "ExpireDate": "2026-06-18T00:00:00",
              "Duration": "20 năm",
              "LicenseHolderName": "Công ty cổ phần Thủy điện Suối Tân",
              "LicenseHolderAddress": "P4, nhà 12, tập thể Đại học Thủy Lợi, phường Trung Liệt, quận Đống Đa, thành phố Hà Nội",
              "LicensingAuthorities": 1,
              "LicenseFile": "86_GP-UBND.pdf",
              "RelatedDocumentFile": null,
              "LicenseRequestFile": null,
              "IsRevoked": true,
              "Status": true,
          },
          "Id": 24,
          "Name": "Công ty cổ phần thủy điện Suối Tân",
          "Address": "P4, nhà 12, tập thể Đại học Thủy Lợi, phường Trung Liệt, quận Đống Đa, thành phố Hà Nội",
          "IdentifierCode": "0103005754",
          "Phone": null,
          "Fax": null,
          "Email": null,
          "Director": null,
          "AuthorityPerson": null,
          "LegalRepresentative": null,
          "UserName": null,
          "Status": true,
      },
      "MiningPurpose": null,
      "LicenseType": "Cấp mới giấy phép",
      "TypeSlug": "thuydien",
      "LicenseFee": null,
      "ConstructionType": "Thủy điện",
      "ParentConstructionId": 1,
      "ParentConstructionType": "nuocmat",
      "TypeOfConstructionId": 4,
      "LicensingAuthoritiesName": "Ủy ban nhân dân Tỉnh",
      "LicenseTypeName": "Cấp mới",
      "OldLicense": null,
      "License_Fk": {
          "Id": 1,
          "LicenseId": 1,
          "LicenseParentId": 0,
          "BasinId": 4,
          "BusinessId": 24,
          "DistrictId": 12,
          "CommuneId": 196,
          "ConstructionId": 1,
          "LicenseFeeId": null,
          "LicensingTypeId": 1,
          "TypeOfConstructionId": 4,
          "AquiferId": null,
          "Status": true,
      },
      "Location": {
          "Id": 196,
          "CityName": "Tỉnh Sơn La",
          "CityId": "14",
          "DistrictName": "Huyện Vân Hồ",
          "DistrictId": "12",
          "CommuneName": "Xã Chiềng Khoa",
          "CommuneId": "04036",
          "CommuneLevel": "Xã",
          "DisplayOrder": null,
          "Status": true,
      },
      "MiningPurposes": [],
      "Id": 1,
      "LicenseName": "Giấy phép khai thác sử dụng nước mặt",
      "LicenseNumber": "86/GP-UBND",
      "SignDate": "2005-05-04T00:00:00",
      "IssueDate": "2006-06-18T00:00:00",
      "ExpireDate": "2026-06-18T00:00:00",
      "Duration": "20 năm",
      "LicenseHolderName": "Công ty cổ phần Thủy điện Suối Tân",
      "LicenseHolderAddress": "P4, nhà 12, tập thể Đại học Thủy Lợi, phường Trung Liệt, quận Đống Đa, thành phố Hà Nội",
      "LicensingAuthorities": 1,
      "LicenseFile": "86_GP-UBND.pdf",
      "RelatedDocumentFile": null,
      "LicenseRequestFile": null,
      "IsRevoked": true,
      "Status": true,
  }
]

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
          <TableSurfaceWater data={data} />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
