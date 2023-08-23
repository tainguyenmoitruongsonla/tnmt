import { FC, useState } from 'react';
import { Button, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LicenseFeeState } from '.';

interface LicenseFeeFieldsetProps {
    data?: LicenseFeeState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: LicenseFeeState[]) => void;
}

const LicenseFeeFeild: FC<LicenseFeeFieldsetProps> = ({ data, onChange }) => {

    const [licenseFees, setLicenseFees] = useState<LicenseFeeState[]>([]);

    const addLicenseFee = () => {
        const newItem: LicenseFeeState = {
            id: 0,
            childrenId: 0,
            licenseFeeNumber: null,
            signDate: dayjs(data?.signDate) || null,
            totalMoney: 0,
            filePdf: null,
            description: null,
        };
        setLicenseFees((prevItems) => [...prevItems, newItem]);
    };

    const removeLicenseFee = (index: any) => {
        setLicenseFees((prevItems) => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);

            return newItems;
        });
    };

    const handleChange = (index: number, prop: keyof LicenseFeeState) => (value: any) => {
        const newLicenseFees = [...licenseFees];
        newLicenseFees[index][prop] = value;
        setLicenseFees(newLicenseFees);

        onChange(newLicenseFees);
    };

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
                                        value={item?.licenseFeeNumber}
                                        onChange={(event) => handleChange(index, 'licenseFeeNumber')(event.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={item.signDate}
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
                                        value={item?.totalMoney}
                                        onChange={(event) => handleChange(index, 'totalMoney')(event.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormControl>
                                        <TextField
                                            id="file-input"
                                            type="file"
                                            size='small'
                                            fullWidth
                                            onChange={(event) => handleChange(index, 'licenseFeeNumber')(event.target.value)}
                                            inputProps={{
                                                accept: '.pdf', // Specify the accepted file types
                                            }}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell size='small' align='center'>
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => removeLicenseFee(index)}
                                        className="text-danger"
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </fieldset>
        </TableContainer>
    )
}

export default LicenseFeeFeild
