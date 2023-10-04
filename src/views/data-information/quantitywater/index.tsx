import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import SFInformation from "./SufaceIF";
import GRInformation from "./GroundIF";
import AverageFlowSF from "./AverageFlow";

const QuantitySFWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Nước mặt-Lượng nước mặt" value="1" />
                    <Tab label="Nước mặt-Dòng chảy trung bình" value="2" />
                    <Tab label="Nước dưới đất" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><SFInformation /></TabPanel>
            <TabPanel value="2"><AverageFlowSF /></TabPanel>
            <TabPanel value="3"><GRInformation /></TabPanel>
           
        </TabContext>
    )
}
export default QuantitySFWater