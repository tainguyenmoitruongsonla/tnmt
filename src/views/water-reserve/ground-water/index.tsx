import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import AquiferArea from "./aqiufer-area";
import ExploitableReservesOfEachLayerOfUndergroundLand from "./exploitable-reserves-of-each-layer-of-underground-land";

const GroundWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Diện tích tầng chứa nước" value="1" />
                    <Tab label="Trữ lượng động tự nhiên của NDĐ" value="2" />
                    <Tab label="Trữ lượng khai thác từng tầng của NDĐ" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><AquiferArea /></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3"><ExploitableReservesOfEachLayerOfUndergroundLand /></TabPanel>
        </TabContext>
    )
}
export default GroundWater