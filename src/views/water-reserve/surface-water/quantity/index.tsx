import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import RiverSFReserve from "./River";
import LakeSFReserve from "./Lake";

const QuantitySFWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Sông suối" value="1" />
                    <Tab label="Ao,hồ,đầm,phá" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><RiverSFReserve /></TabPanel>
            <TabPanel value="2"><LakeSFReserve /></TabPanel>
           
        </TabContext>
    )
}
export default QuantitySFWater