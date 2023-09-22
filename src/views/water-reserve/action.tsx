import Delete from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from "@mui/material"

const Action = () => {
  return (
    <Box>
        <IconButton>
        <EditIcon className='tableActionBtn' />
      </IconButton>
      <IconButton>
        <Delete className='tableActionBtn deleteBtn' />
      </IconButton>
    </Box>
  )
}
export default Action
