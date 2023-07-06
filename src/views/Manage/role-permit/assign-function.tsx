import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import TableComponent from 'src/@core/components/table'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import fetchData from 'src/api/fetch'
import postData from 'src/api/post'

const Form = ({ data }: any) => {

  const roleData = data;
  const [dashData, setDashData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const roleInfoColumn = [
    { id: 'name', label: 'Tên' },
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
        showLoading();
        const rdash = await fetchData(`Role/${data.id}`);
        setDashData(rdash.dashboards);
      } catch (error) {
        setDashData([]);
      }
      hideLoading();
    };

    getData();

  }, [postSuccess]);

  const handleCheckFunction = (f: any, dash: any) => async (event: ChangeEvent<HTMLInputElement>) => {
    showLoading();
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
      setPostSuccess(true);
      hideLoading();
    } else {
      showLoading();
      await postData('Permission/save', item);
      setPostSuccess(true);
      hideLoading();
    }
    hideLoading();
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
  const formTitle = 'Cấp phép người dùng'

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
