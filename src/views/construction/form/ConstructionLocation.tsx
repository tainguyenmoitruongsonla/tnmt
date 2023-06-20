import { useState} from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
interface ConstructionItem {
    name: string;
    x: string;
    y: string;
  }
const ConstructionLocation = () => {
    const [constructionItems, setConstructionItems] = useState<ConstructionItem[]>([]);

    const addConstructionItem = () => {
      const newItem: ConstructionItem = {
        name: '',
        x:'',
        y: '',
      };
      setConstructionItems((prevItems) => [...prevItems, newItem]);
    };
  
    const removeConstructionItem = (index: any) => {
      setConstructionItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.splice(index, 1);
        return newItems;
      });
    };

  return (
    <fieldset>
    <legend>
      <Typography variant={'h6'}>VỊ TRÍ CÁC HẠNG MỤC CHÍNH CỦA CÔNG TRÌNH KHAI THÁC SỬ DỤNG NƯỚC</Typography>
    </legend>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>TT</TableCell>
            <TableCell align='center'>Hạng mục</TableCell>
            <TableCell align='center'>Tọa độ X</TableCell>
            <TableCell align='center'>Tọa độ Y</TableCell>
            <TableCell align='center'>
              <Button className='btn-link'  onClick={addConstructionItem}>Thêm</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {constructionItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center align-middle font-13">{index + 1}</TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      name="tenhangmuc"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                     type="text"
                      name="x"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                    type="text"
                      name="y"
                      fullWidth      
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => removeConstructionItem(index)}
                      className="text-danger"
                    >
                     <DeleteIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  </fieldset>)
}

export default ConstructionLocation
