// import { useState } from 'react'
import Box from '@mui/material/Box';
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import { Checkbox, FormControlLabel } from "@mui/material";

const MapLegend = () => {
    // const [openSurface, setOpenSurface] = useState(true);
    // const [openGround, setOpenGround] = useState(true);
    // const [openDischarge, setOpenDischarge] = useState(true);

    // const handleClickSurface = () => {
    //     setOpenSurface(!openSurface);
    // };

    // const handleClickGround = () => {
    //     setOpenGround(!openGround);
    // };

    // const handleClickDischarge = () => {
    //     setOpenDischarge(!openDischarge);
    // };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
            >
                <TreeItem nodeId="1" label="NƯỚC MẶT">
                    <FormControlLabel control={<Checkbox name={"thuy-dien"} checked={true} />} label={"Thủy điện"} />
                </TreeItem>
            </TreeView>
        </Box>
    );
};
export default MapLegend;
