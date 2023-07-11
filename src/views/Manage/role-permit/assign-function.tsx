import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import TableComponent from 'src/@core/components/table'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import fetchData from 'src/api/fetch'
import postData from 'src/api/post'

const Form = ({ data }: any) => {

  const roleData = data;
  const [dashData, setDashData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  if (loading == true) {
    showLoading();
  } else {
    hideLoading();
  }

  const roleInfoColumn = [
    { id: 'name', label: 'Tên', elm: (row:any) => (<Typography py={2}>{row.name}</Typography>)},
    { id: 'description', label: 'Mô tả' },
  ];

  const permitColumn = [
    { id: 'name', label: 'Màn hình chức năng' },
    { id: 'path', label: 'URL' },
    {
      id: 'permitAccess',
      label: 'Được phép truy cập',
      elm: (dash: any) => (
        <div>
          {dash.functions.map((f: any) => {
            // Get function
            return (
              <FormControlLabel
                key={f.id}
                control={<FormControlLabel control={<Checkbox name={f.permitCode} checked={f.status} onChange={handleCheckFunction(f, dash)} />} label={f.permitName} />}
                label={f.name}
              />
            )
          })}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const rdash = await fetchData(`Role/${data.id}`);
        setDashData(rdash.dashboards);
      } catch (error) {
        setDashData([]);
      }
      setLoading(false);
    };
    getData();

  }, [data.id, postSuccess]);

  const handleCheckFunction = (f: any, dash: any) => async () => {
    setLoading(true);
    const item = {
      roleId: roleData.id,
      roleName: roleData.name,
      dashboardId: dash.id,
      functionId: f.id,
      functionName: f.permitName,
      functionCode: f.permitCode,
    }

    if (f.status == true) {
      await postData('Permission/delete', item);
    } else {
      showLoading();
      await postData('Permission/save', item);
    }
    setLoading(false);
    setPostSuccess(true);
    handlePostSuccess();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} pb={10}>
          <TableComponent columns={roleInfoColumn} data={[roleData]} />
        </Grid>
      </Grid>
      <TableComponent columns={permitColumn} data={dashData} pagination />
    </>
  );
}

const AssignFunction = ({ data }: any) => {
  const formTitle = 'Thêm chức năng nhóm người dùng'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <Typography
          className='btnShowFilePdf'
          onClick={() => openDialogs(<Form data={data} closeDialogs={closeDialogs} />, formTitle)}
        >
          {data.name}
        </Typography>
      )}
    </DialogsControlFullScreen>
  )
}

export default AssignFunction
