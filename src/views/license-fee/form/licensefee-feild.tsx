import { FC, useState } from 'react';
import { Button, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface LicenseFeeFieldsetProps {
    data?: LicenseFeeState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: LicenseFeeState[]) => void;
}

interface LicenseFeeState {
    id?: number,
    childrenId?: number,
    licenseFeeNumber?: string,
    signDate?: Dayjs | null,
    totalMoney?: number | undefined,
    filePdf?: File | null | undefined,
    description?: string,
}
const LicenseFeeFeild: FC<LicenseFeeFieldsetProps> = ({ data, onChange }) => {

    const [licenseFees, setLicenseFees] = useState<LicenseFeeState[]>([]);

    const d = new Date();
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const y = d.getFullYear();
    const today = `${y}-${m}-${day}`

    const addLicenseFee = () => {
        const newItem: LicenseFeeState = {
            id: 0,
            childrenId: 0,
            licenseFeeNumber: '',
            signDate: dayjs(data?.signDate) || dayjs(today),
            totalMoney: 0,
            filePdf: null,
            description: '',
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
        <fieldset>
            <legend>
                <Typography variant={'subtitle1'} className='legend__title'>TIỀN CẤP QUYỀN</Typography>
            </legend>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell size='small' align='center'>TT</TableCell>
                            <TableCell size='small' align='center'>SỐ QĐ TCQ</TableCell>
                            <TableCell size='small' align='center'>Ngày ký</TableCell>
                            <TableCell size='small' align='center'>Tổng TCQ</TableCell>
                            <TableCell size='small' align='center'>File TCQ</TableCell>
                            <TableCell size='small' align='center'>
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
            </TableContainer>
        </fieldset>)
}

export default LicenseFeeFeild
