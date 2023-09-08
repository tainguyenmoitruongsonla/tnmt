import { FC, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, ButtonGroup, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CloudUpload, Delete } from '@mui/icons-material';
import { LicenseFeeState } from './license-fee-interface';

interface LicenseFeeFieldsetProps {
    data?: LicenseFeeState[];
    onChange: (data: LicenseFeeState[], dataDeleted: LicenseFeeState[]) => void;
}

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
  color: #fff;
`;

const LicenseFeeFeild: FC<LicenseFeeFieldsetProps> = ({ data, onChange }) => {

    const initialLicenseFees: LicenseFeeState[] = data ? data.map((e: LicenseFeeState) => ({
        id: e.id,
        childrenId: e.childrenId,
        licenseFeeNumber: e.licenseFeeNumber,
        signDate: dayjs(e?.signDate),
        totalMoney: e.totalMoney,
        filePdf: e.filePdf,
        description: e.description,
    })) : [];


    const [licenseFees, setLicenseFees] = useState<LicenseFeeState[]>(initialLicenseFees);
    const [itemDelete, setItemDelete] = useState<LicenseFeeState[]>([]);

    const addLicenseFee = () => {
        const newItem: LicenseFeeState = {
            id: 0,
            childrenId: 0,
            licenseFeeNumber: '',
            signDate: null,
            totalMoney: 0,
            filePdf: null,
            description: null,
        };
        setLicenseFees((prevItems) => [...prevItems, newItem]);
    };

    const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null);
    const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl);
    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);

    const DeleteRowData = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setDeleteConfirmAnchorEl(event.currentTarget);
        setDeleteTargetIndex(index);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmAnchorEl(null);
    };

    const handleDeleteConfirm = () => {
        if (deleteTargetIndex !== null) {
            deleteLicFeeItem(deleteTargetIndex); // Pass the index here
            setDeleteTargetIndex(null);
        }

        setDeleteConfirmAnchorEl(null);
    };

    const deleteLicFeeItem = (index: number) => {
        setLicenseFees((prevItems) => {
            const newItems = [...prevItems];
            const removedItem = newItems.splice(index, 1)[0];

            if (removedItem?.id !== undefined && removedItem?.id > 0) {
                setItemDelete((prevDeletedItems) => [...prevDeletedItems, removedItem]);
            }

            return newItems;
        });

        // Call onChange after the state update
        onChange(licenseFees, itemDelete);
        setDeleteConfirmAnchorEl(null);
    };


    const handleChange = (index: number, prop: keyof LicenseFeeState) => (value: any) => {
        const newLicenseFees = [...licenseFees];
        newLicenseFees[index][prop] = value;
        setLicenseFees(newLicenseFees);

        // Call onChange after the state update
        onChange(newLicenseFees, itemDelete);
    };

    useEffect(() => {
        onChange(licenseFees, itemDelete);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [licenseFees, itemDelete]);

    return (
        <TableContainer component={Paper}>
            <fieldset>
                <legend>
                    <Typography variant={'subtitle1'} className='legend__title'>TIỀN CẤP QUYỀN</Typography>
                </legend>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell size='small' align='center'>TT</TableCell>
                            <TableCell size='small' align='center'>SỐ QĐ TCQ</TableCell>
                            <TableCell size='small' align='center'>Ngày ký</TableCell>
                            <TableCell size='small' align='center'>Tổng TCQ</TableCell>
                            <TableCell size='small' align='center'>File TCQ</TableCell>
                            <TableCell size='small' align='center' sx={{ maxWidth: 100, width: 100 }}>
                                <Button className='btn-link' onClick={addLicenseFee}>Thêm</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {licenseFees.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                                <TableCell>
                                    <TextField
                                        size='small'
                                        type='text'
                                        fullWidth
                                        placeholder=''
                                        value={item.licenseFeeNumber}
                                        onChange={(event) => handleChange(index, 'licenseFeeNumber')(event.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={dayjs(item.signDate)}
                                            onChange={(newSignDate: any) => handleChange(index, 'signDate')(newSignDate.toDate())}
                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                            format="DD/MM/YYYY" />
                                    </LocalizationProvider>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size='small'
                                        type='text'
                                        fullWidth
                                        placeholder=''
                                        value={item.totalMoney}
                                        onChange={(event) => handleChange(index, 'totalMoney')(event.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="uploadBtn"
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUpload />}
                                        href="#file-upload"
                                    >
                                        Upload a file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>


                                    {/* <FormControl>
                                        <TextField
                                            id="file-input"
                                            type="file"
                                            size='small'
                                            fullWidth
                                            onChange={(event) => handleChange(index, 'filePdf')(event.target.value)}
                                            inputProps={{
                                                accept: '.pdf', // Specify the accepted file types
                                            }}
                                        />
                                    </FormControl> */}
                                </TableCell>
                                <TableCell size='small' align='center'>
                                    <>
                                        <IconButton
                                            aria-describedby={`${item.licenseFeeNumber}-${index}`}
                                            onClick={(event) => DeleteRowData(event, index)} // Pass the index here
                                            data-row-id={`${item.licenseFeeNumber}-${index}`}
                                        >
                                            <Delete className='tableActionBtn deleteBtn' />
                                        </IconButton>
                                        <Popover
                                            id={deleteConfirmOpen ? `${item.licenseFeeNumber}-${index}` : undefined}
                                            open={deleteConfirmOpen}
                                            anchorEl={deleteConfirmAnchorEl}
                                            onClose={handleDeleteCancel}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Alert severity="warning">
                                                Xóa bản ghi này ?
                                                <Box sx={{ justifyContent: 'center', paddingTop: 4, width: '100%' }}>
                                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                        <Button size="small" onClick={() => handleDeleteConfirm()} >
                                                            Đúng
                                                        </Button>
                                                        <Button color='error' size="small" onClick={() => handleDeleteCancel()} >
                                                            Không
                                                        </Button>
                                                    </ButtonGroup>
                                                </Box>
                                            </Alert>
                                        </Popover>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </fieldset>
        </TableContainer>
    )
}

export default LicenseFeeFeild;
