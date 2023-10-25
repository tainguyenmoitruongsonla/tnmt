import React, { useState, SyntheticEvent } from 'react'
import { Assessment } from '@mui/icons-material'
import { Grid, IconButton, Tooltip, Box, Tab } from '@mui/material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { TabContext, TabList, TabPanel } from "@mui/lab"
import MonitoringSFData from './cons-data'
import MonitoringSFChart from './cons-chart'

interface FormMonitoringSystemProps {
    data: any
}

const FormMonitoringSystem: React.FC<FormMonitoringSystemProps> = () => {
    const [value, setValue] = useState('1');

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Grid>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab} aria-label="ground water reserve">
                    <Tab label="Số liệu vận hành" value="1" />
                    <Tab label="Đồ thị vận hành" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><MonitoringSFData /></TabPanel>
            <TabPanel value="2"><MonitoringSFChart /></TabPanel>
           
        </TabContext>
        </Grid>
    )
}

interface MonitoringSystemProps {
    data?: any
}

const ViewMonitoringSystemData: React.FC<MonitoringSystemProps> = ({ data }) => {
    const formTitle = 'Thông tin số liệu giám sát vận hành'

    return (
        <DialogsControlFullScreen>
            {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
                <>
                    {<Tooltip title='Xem chi tiết'>
                            <IconButton
                                onClick={() =>
                                    openDialogs(
                                        <FormMonitoringSystem data={data} />,
                                        formTitle
                                    )
                                }
                            >
                                <Assessment className='tableActionBtn' />
                            </IconButton>
                        </Tooltip>
                    }
                </>
            )}
        </DialogsControlFullScreen>
    )
}

export default ViewMonitoringSystemData
