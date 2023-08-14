import { Fragment, useState } from "react";
import { Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const consType = [
    { id: 1, label: "NƯỚC MẶT"},
    { id: 4, label: "Thuỷ điện" },
    { id: 5, label: "Hồ chứa" },
    { id: 6, label: "Trạm bơm" },
    { id: 11, label: "Trạm cấp nước" },
    { id: 13, label: "Cống" },
    { id: 14, label: "Nhà máy nước" },
];

const initialValue = Array;

const MapLegend = () => {
    const [checkedCons, setCheckedCons] = useState(initialValue);

    const handleChange1 = (isChecked:any) => {
        if (isChecked)
        return setCheckedCons(
            consType.map((estudiante) => estudiante.id)
        );
        else setCheckedCons([]);
    };

    const handleChange2 = (isChecked:any, id:any) => {
        const index = checkedCons.indexOf(id);

        // The checked value is altered before the state changes for some reason is not a trully controlled component
        // So the next conditions are INVERTED.

        if (isChecked) return setCheckedCons((state) => [...state, id]);

        if (!isChecked && index > -1)
        return setCheckedCons((state) => {
            state.splice(index, 1);
            return JSON.parse(JSON.stringify(state)); // Here's the trick => React does not update the f* state array changes even with the spread operator, the reference is still the same.
        });
    };

    return (
    <Fragment>
      {/* Parent */}
        <FormControlLabel label="NƯỚC MẶT"  control={
            <Checkbox sx={{py: 1, pl: 4, pr: 1}} checked={checkedCons.length === consType.length} indeterminate={
            checkedCons.length !== consType.length &&
            checkedCons.length > 0}
            onChange={(event) => handleChange1(event.target.checked)}/>} 
        />

        {/* Childrens */}
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2, pb: 2 }}>
            <FormControlLabel control={
                <Checkbox sx={{py: 0, pl: 3, pr: 1}} key={4} checked={checkedCons.includes(4)}
                onChange={(event) => handleChange2(event.target.checked, 4)}
                inputProps={{ "aria-label": "controlled" }} />
            } label={<Typography sx={{ display: "flex", fontSize: 13}}><img src="/images/icon/thuydien.png" alt="thuydien" width={20} /><span>&nbsp;Thuỷ điện</span></Typography> }/>
            <FormControlLabel control={
                <Checkbox sx={{py: 0, pl: 3, pr: 1}} key={5} checked={checkedCons.includes(5)}
                onChange={(event) => handleChange2(event.target.checked, 5)}
                inputProps={{ "aria-label": "controlled" }} />
            } label={<Typography sx={{ display: "flex", fontSize: 13}}><img src="/images/icon/hochua.png" alt="hochua" width={20} /><span>&nbsp;Hồ chứa</span></Typography> }/>
            <FormControlLabel control={
                <Checkbox sx={{py: 0, pl: 3, pr: 1}} key={6} checked={checkedCons.includes(6)}
                onChange={(event) => handleChange2(event.target.checked, 6)}
                inputProps={{ "aria-label": "controlled" }} />
            } label={<Typography sx={{ display: "flex", fontSize: 13}}><img src="/images/icon/trambom.png" alt="trambom" width={20} /><span>&nbsp;Trạm bơm</span></Typography> }/>
            <FormControlLabel control={
                <Checkbox sx={{py: 0, pl: 3, pr: 1}} key={11} checked={checkedCons.includes(11)}
                onChange={(event) => handleChange2(event.target.checked, 11)}
                inputProps={{ "aria-label": "controlled" }} />
            } label={<Typography sx={{ display: "flex", fontSize: 13}}><img src="/images/icon/tramcapnuoc.png" alt="tramcapnuoc" width={20} /><span>&nbsp;Trạm cấp nước</span></Typography> }/>
            <FormControlLabel control={
                <Checkbox sx={{py: 0, pl: 3, pr: 1}} key={13} checked={checkedCons.includes(13)}
                onChange={(event) => handleChange2(event.target.checked, 13)}
                inputProps={{ "aria-label": "controlled" }} />
            } label={<Typography sx={{ display: "flex", fontSize: 13}}><img src="/images/icon/cong.png" alt="cong" width={20} /><span>&nbsp;Cống</span></Typography> }/>
            <FormControlLabel control={
                <Checkbox sx={{py: 0, pl: 3, pr: 1}} key={14} checked={checkedCons.includes(14)}
                onChange={(event) => handleChange2(event.target.checked, 14)}
                inputProps={{ "aria-label": "controlled" }} />
            } label={<Typography sx={{ display: "flex", fontSize: 13}}><img src="/images/icon/nhamaynuoc.png" alt="nhamaynuoc" width={20} /><span>&nbsp;Nhà máy nước</span></Typography> }/>
        </Box>
    </Fragment>
    );
};

export default MapLegend;
