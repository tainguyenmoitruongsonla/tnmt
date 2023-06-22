import { DatePicker } from '@mui/x-date-pickers';

const DatePickerComponent = (props: any) => {

    return <DatePicker {...props} slotProps={{ textField: { size: 'small', fullWidth: true, inputProps: { style: { fontSize: 11 } }, InputLabelProps: { style: { fontSize: 11 } } } }} />
}
export default DatePickerComponent;