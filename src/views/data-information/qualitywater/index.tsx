import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import QualityGround from "./QualityGR";
import QualitySuface from "./QualitySF";


const QuatitySFWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Chất lượng nước mặt" value="1" />
                    <Tab label="Chất lượng nước dưới đất" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><QualitySuface /></TabPanel>
            <TabPanel value="2"><QualityGround /></TabPanel>
           
        </TabContext>
    )
}
export default QuatitySFWater