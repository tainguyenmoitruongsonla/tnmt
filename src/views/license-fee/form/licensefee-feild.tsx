import { FC, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, Button, ButtonGroup, Fade, Grid, IconButton, Modal, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Add, Cancel, CloudUpload, Delete, Edit, Save } from '@mui/icons-material';
import { LicenseFeeState } from './license-fee-interface';
import { VisuallyHiddenInput } from 'src/@core/theme/VisuallyHiddenInput';
import FormatDate from 'src/@core/components/format-date';

interface LicenseFeeFieldsetProps {
    data?: LicenseFeeState[] | null;
    onChange: (data: LicenseFeeState[], dataDeleted: LicenseFeeState[]) => void;
}

const LicenseFeeFeild: FC<LicenseFeeFieldsetProps> = ({ data, onChange }) => {

    const initialLicenseFees: LicenseFeeState[] = data ? data.map((e: LicenseFeeState) => ({
        id: e.id,
        idCon: e.idCon,
        soQDTCQ: e.soQDTCQ,
        ngayKy: dayjs(e?.ngayKy),
        tongTienCQ: e.tongTienCQ,
        filePDF: e.filePDF,
        ghiChu: e.ghiChu,
    })) : [];


    const [licenseFees, setLicenseFees] = useState<LicenseFeeState[]>(initialLicenseFees);
    const [newLicenseFeeIndex, setNewLicenseFeeIndex] = useState(-1)
    const [newLicenseFee, setNewLicenseFee] = useState<LicenseFeeState>({
        id: undefined,
        idCon: undefined,
        soQDTCQ: undefined,
        ngayKy: undefined,
        tongTienCQ: undefined,
        filePDF: undefined,
        ghiChu: undefined,
    })
    const [itemDelete, setItemDelete] = useState<LicenseFeeState[]>([]);
    const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null);
    const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl);
    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
    const [required, setRequire] = useState<string | null>(null)

    const DeleteRowData = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setDeleteConfirmAnchorEl(event.currentTarget);
        setDeleteTargetIndex(index);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmAnchorEl(null);
    };

    const handleDeleteConfirm = () => {
        if (deleteTargetIndex !== null) {
            deleteItem(deleteTargetIndex); // Pass the index here
            setDeleteTargetIndex(null);
        }

        setDeleteConfirmAnchorEl(null);
    };

    const deleteItem = (index: number) => {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setNewLicenseFee(prevItem => {
                const newItem: LicenseFeeState = { ...prevItem };

                newItem.fileUpload = file;
                newItem.filePDF = `${newItem.soQDTCQ?.replace(/\//g, "_").toLowerCase()}.pdf`;

                return newItem;
            });
        }
    };

    const handleChange = (prop: keyof LicenseFeeState) => (value: any) => {
        setNewLicenseFee(prevItem => {
            const newItem: LicenseFeeState = { ...prevItem };

            (newItem as any)[prop] = value;

            return newItem;
        });
    };

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = (index: number, e: any, func: "add" | "update") => {
        setOpenModal(true);
        setNewLicenseFeeIndex(index)
        if (func === 'add') {
            // Set all properties of newLicenseFee to null
            const nullValue = Object.fromEntries(
                Object.keys(newLicenseFee || {}).map(key => [key, null])
            );

            setNewLicenseFee({ ...nullValue });
        }

        if (func === 'update') {
            setNewLicenseFee({ ...e });
        }
    }

    const handleSave = () => {
        if (newLicenseFee.soQDTCQ !== undefined || newLicenseFee.ngayKy !== undefined) {
            if (newLicenseFeeIndex > 0) {
                setLicenseFees(prevItems => {
                    const updatedItems = [...prevItems];
                    updatedItems[newLicenseFeeIndex] = { ...newLicenseFee };

                    return updatedItems;
                });
            } else {
                setLicenseFees(prevItems => [...prevItems, newLicenseFee]);
            }

            onChange([...licenseFees], [...itemDelete]);
            setNewLicenseFeeIndex(-1)
            handleCloseModal();
        } else {
            setRequire("Số quyết định và Ngày ký không được để trống");
        }
    }

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
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
                            <TableCell size='small' align='center' padding='checkbox' rowSpan={2}>
                                <Box>
                                    <IconButton aria-label="add" className='tableActionBtn' onClick={() => handleOpenModal(0, null, 'add')}>
                                        <Add />
                                    </IconButton>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={openModal}
                                        onClose={handleCloseModal}
                                        closeAfterTransition
                                        slots={{ backdrop: Backdrop }}
                                        slotProps={{
                                            backdrop: {
                                                timeout: 500,
                                            },
                                        }}
                                    >
                                        <Fade in={openModal}>
                                            <Box sx={{ ...style, width: 600 }}>
                                                <Typography id="transition-modal-title" variant="h6" component="h2" align="center" py={3}>
                                                    THÔNG TIN TIỀN CẤP QUYỀN
                                                </Typography>
                                                {required ? <Alert sx={{ my: 2 }} severity="warning">{required}</Alert> : null}
                                                <Grid container spacing={4}>
                                                    <Grid item md={12}>
                                                        <TextField
                                                            name='soQDTCQ'
                                                            fullWidth
                                                            label='Số quyết định'
                                                            placeholder='Số quyết định'
                                                            size='small'
                                                            value={newLicenseFee.soQDTCQ}
                                                            onChange={event => handleChange('soQDTCQ')(event.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                value={dayjs(newLicenseFee.ngayKy)}
                                                                onChange={(newngayKy: any) => handleChange('ngayKy')(newngayKy.toDate())}
                                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                                label='Ngày ký'
                                                                format="DD/MM/YYYY" />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <TextField
                                                            name='tongTienCQ'
                                                            fullWidth
                                                            label='Tổng tiền cấp quyền'
                                                            placeholder='Tổng tiền cấp quyền'
                                                            size='small'
                                                            value={newLicenseFee.tongTienCQ}
                                                            onChange={event => handleChange('tongTienCQ')(event.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        {newLicenseFee.fileUpload && (<Typography mb={3}>{newLicenseFee.fileUpload?.name}</Typography>)}
                                                        <Button
                                                            fullWidth
                                                            className="uploadBtn"
                                                            component="label"
                                                            variant="contained"
                                                            startIcon={<CloudUpload />}
                                                            href={`#file-upload-licFee`}
                                                        >
                                                            Upload file
                                                            <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e)} accept='.pdf' />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                                <Grid item sx={{ display: "flex", justifyContent: "end", py: 2 }}>
                                                    <Button startIcon={<Save />}
                                                        sx={{ ml: 1 }}
                                                        variant='outlined'
                                                        color='primary'
                                                        onClick={handleSave}>
                                                        Lưu
                                                    </Button>
                                                    <Button startIcon={<Cancel />}
                                                        sx={{ ml: 1 }}
                                                        variant='outlined'
                                                        color='error'
                                                        onClick={handleCloseModal}>
                                                        Huỷ
                                                    </Button>
                                                </Grid>
                                            </Box>
                                        </Fade>
                                    </Modal>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {licenseFees.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                                <TableCell>
                                    {item.soQDTCQ}
                                </TableCell>
                                <TableCell>
                                    {FormatDate(item.ngayKy)}
                                </TableCell>
                                <TableCell>
                                    {item.tongTienCQ}
                                </TableCell>
                                <TableCell>
                                    {item.fileUpload?.name}
                                </TableCell>
                                <TableCell size='small' align='center'>
                                    <Box display={'flex'}>
                                        <IconButton
                                            aria-describedby={`${item.soQDTCQ}-${index}`}
                                            onClick={() => handleOpenModal(index, item, 'update')}
                                            data-row-id={`${item.soQDTCQ}-${index}`}
                                        >
                                            <Edit className='tableActionBtn' />
                                        </IconButton>
                                        <IconButton
                                            aria-describedby={`${item.soQDTCQ}-${index}`}
                                            onClick={(event) => DeleteRowData(event, index)}
                                            data-row-id={`${item.soQDTCQ}-${index}`}
                                        >
                                            <Delete className='tableActionBtn deleteBtn' />
                                        </IconButton>
                                        <Popover
                                            id={deleteConfirmOpen ? `${item.soQDTCQ}-${index}` : undefined}
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
                                    </Box>
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
