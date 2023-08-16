import { Typography, Grid } from "@mui/material"
import { useEffect,ChangeEvent, FC, useState } from "react"
import { AutoComplete, TextField } from "src/@core/components/field";
import ConstructionDetails from "./cons-detail-fieldset";

interface ConsTypeFieldsetProps {
  data?: ConsState; // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: ConsState) => void;
}

interface ConsState{
  id: number;
  parentId: number;
}

const construcsionType = [
  { title: "Thủy điện", value: 4 },
  { title: "Hồ chứa", value: 5 },
  { title: "Trạm bơm", value: 6 },
  { title: "Đập/Hệ thống thủy lợi", value: 12 },
  { title: "Cống", value: 13 },
  { title: "Trạm cấp nước", value: 11 },
  { title: "Nhà máy nước", value: 14 },
  { title: "Công trình khác", value: 23 },
];

const ConstructionField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [licenseData, setLicenseData] = useState<ConsState>({
    id: 0,
    parentId: 0,
    });

    useEffect(() => {
      if (data) {
          setLicenseData(data);
      }
  }, [data]);

  const handleChange = (prop: keyof ConsState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setLicenseData({ ...licenseData, [prop]: value });
    onChange({ ...licenseData, [prop]: value });
};


  return (
    <>
      <fieldset>
        <legend >
          <Typography variant={'subtitle1'} className='legend__title'>THÔNG TIN CÔNG TRÌNH</Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CP"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>

            <AutoComplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Giấy phép"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn Tỉnh/TP"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn Quận/Huyện"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn Xã/phường"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Địa điểm công trình' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Vĩ độ' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Kinh độ' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Năm vận hành' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Năm xây dựng' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Tiểu vùng quy hoạch' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn lưu vực sông"
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Nguồn nước khai thác' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue=''
              label='Phương thức khai thác'
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Chế độ khai thác' />
          </Grid>
        </Grid>
      </fieldset>

      <ConstructionDetails />
    </>
  )
}
export default ConstructionField
