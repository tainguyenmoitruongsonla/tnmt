import { TextField } from "@mui/material"

const TextFieldComponent = ( props:any) => {

    return <TextField {...props} inputProps={{ style: { fontSize: 11 } }} InputLabelProps={{ style: { fontSize: 14 } }} />
}
export default TextFieldComponent;