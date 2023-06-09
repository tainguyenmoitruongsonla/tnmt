// ** MUI Imports
import { Grid, Box, Button, Typography, Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react'

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import ConstructionMap from 'src/views/construction'
import TableList from 'src/views/construction/TableList';
import CreateConstruction from 'src/views/construction/CreateConstruction';
import SearchConstruction from 'src/views/construction/Search';


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
              "CreatedTime": null,
              "CreatedUser": "",
              "ModifiedTime": "2023-04-03T08:10:53.043",
              "ModifiedUser": "dev.dangnt",
              "Status": true,
              "IsDeleted": false,
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
              "CreatedTime": null,
              "CreatedUser": "",
              "ModifiedTime": "2023-04-03T08:10:53.03",
              "ModifiedUser": "dev.dangnt",
              "Status": true,
              "IsDeleted": false,
              "LowWL": null
          }
      ],
      "ParentConstructionId": 1,
      "ParentConstructionType": "NƯỚC MẶT",
      "ParentTypeSlug": "nuocmat",
      "ConstructionTypeName": "Thủy điện",
      "TypeSlug": "thuydien",
      "License": {
          "Construction": null,
          "Business": null,
          "MiningPurpose": null,
          "LicenseType": "Thu hồi giấy phép",
          "TypeSlug": null,
          "LicenseFee": null,
          "ConstructionType": null,
          "ParentConstructionId": 1,
          "ParentConstructionType": null,
          "TypeOfConstructionId": 4,
          "LicensingAuthoritiesName": "Ủy ban nhân dân Tỉnh",
          "LicenseTypeName": "Thu hồi",
          "OldLicense": null,
          "License_Fk": {
              "Id": 64,
              "LicenseId": 64,
              "LicenseParentId": 1,
              "BasinId": 4,
              "BusinessId": 24,
              "DistrictId": 12,
              "CommuneId": 196,
              "ConstructionId": 1,
              "LicenseFeeId": null,
              "LicensingTypeId": 5,
              "TypeOfConstructionId": 4,
              "AquiferId": null,
              "CreatedTime": null,
              "CreatedUser": "",
              "ModifiedTime": "2023-03-10T15:22:55.977",
              "ModifiedUser": "dev.dangnt",
              "Status": true,
              "IsDeleted": false
          },
          "Location": null,
          "MiningPurposes": null,
          "Id": 64,
          "LicenseName": "Quyết định về việc thu hồi Giấy phép khai thác - sử dụng nước mặt để phát điện số 86/GP-TNMT ngày 17/5/2005 của Giám đốc Sở Tài nguyên và Môi trường cấp cho Công ty cổ phần thủy điện Suối Tân",
          "LicenseNumber": "2408/GP-UBND",
          "SignDate": "2013-10-13T00:00:00",
          "IssueDate": "2013-10-13T00:00:00",
          "ExpireDate": null,
          "Duration": "2013-10-14",
          "LicenseHolderName": "Công ty cổ phần thủy điện Suối Tân",
          "LicenseHolderAddress": "Tại P4, nhà 12, tập thể Đại học Thủy Lợi, phường Trung Liệt, quận Đống Đa, TP. Hà Nội",
          "LicensingAuthorities": 1,
          "LicenseFile": "2408_UBND_2013.pdf",
          "RelatedDocumentFile": null,
          "LicenseRequestFile": null,
          "IsRevoked": false,
      },
      "LicenseFee": [],
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
          }
      ],
      "Commune": {
          "Id": 196,
          "CityName": "Tỉnh Sơn La",
          "CityId": "14",
          "DistrictName": "Huyện Vân Hồ",
          "DistrictId": "12",
          "CommuneName": "Xã Chiềng Khoa",
          "CommuneId": "04036",
          "CommuneLevel": "Xã",
          "DisplayOrder": null,
      },
      "licenseDuration": "2013-10-14",
      "licenseIssueDate": "2013-10-13T00:00:00",
      "LicenseFile": "2408_UBND_2013.pdf",
      "licensingAuthorities": 1,
      "licenseNumber": "2408/GP-UBND",
      "licenseName": "Quyết định về việc thu hồi Giấy phép khai thác - sử dụng nước mặt để phát điện số 86/GP-TNMT ngày 17/5/2005 của Giám đốc Sở Tài nguyên và Môi trường cấp cho Công ty cổ phần thủy điện Suối Tân",
      "Giengkhaithac": 0.0,
      "Giengquantrac": 0.0,
      "Xathaixl": 0.0,
      "Xathaitn": 0.0,
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
  }
]

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
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
       <Grid item xs={12} sm={12} md={12} sx={{height:'55vh', overflow:'hidden'}}>
          <ConstructionMap />
       </Grid>
       <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
          <Box>
            <Typography className='_font12'>
              Tổng số công trình KTSDN  mặt: 132
            </Typography>
            <Typography className='_font12'>
              Số công trình đã cấp phép: 132
            </Typography>
          </Box>
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
              <SearchConstruction/>
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
          <TableList data={data} />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
