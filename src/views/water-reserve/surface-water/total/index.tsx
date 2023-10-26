import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import TotalBasin from "./total-basin";


const TotalSFWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Theo lưu vực" value="1" />
                    <Tab label="Theo trạm" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><TotalBasin /></TabPanel>
            <TabPanel value="2"><TotalBasin /></TabPanel>
           
        </TabContext>
    )
}
export default TotalSFWater