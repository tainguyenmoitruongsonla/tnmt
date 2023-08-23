import { useEffect,ChangeEvent, FC, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  TextField,  Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

interface ConstructionItem {
  name: string;
  x: number;
  y: number;
  lat: number;
  lng:number;
}

interface ConsItemProps {
  data?: ConstructionItem; // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: ConstructionItem) => void;
}

const ConsGroundItem: FC<ConsItemProps> = ({ data, onChange }) => {
  const [constructionItems, setConstructionItems] = useState<ConstructionItem[]>([]);
  const addConstructionItem = () => {
    const newItem: ConstructionItem = {
      name: '',
      x: 0,
      y: 0,
      lat:0,
      lng:0,
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

  const [consSFData, setConsSFData] = useState<ConstructionItem>({
    name: '',
    x: 0,
      y: 0,
      lat:0,
      lng:0,
    });

    useEffect(() => {
      if (data) {
        setConsSFData(data);
      }
  }, [data]);

  const handleChange = (prop: keyof ConstructionItem) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConsSFData({ ...consSFData, [prop]: value });
    onChange({ ...consSFData, [prop]: value });
};

  return (   
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>VỊ TRÍ CÁC HẠNG MỤC CHÍNH CỦA CÔNG TRÌNH KHAI THÁC SỬ DỤNG NƯỚC</Typography>
      </legend>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} size='small' align='center'>TT</TableCell>
              <TableCell rowSpan={2}   size='small' align='center'>Hạng mục</TableCell>
              <TableCell colSpan={2}  size='small' align='center'>Tọa độ (VN2000)</TableCell>
              <TableCell colSpan={2}   size='small' align='center'>Tọa độ (WGS84)</TableCell>
              <TableCell rowSpan={2} size='small' align='center'>
                <Button className='btn-link' onClick={addConstructionItem}>Thêm</Button>
              </TableCell>
            </TableRow>     
            <TableRow>
              <TableCell size='small' align='center'>X</TableCell>
              <TableCell  size='small' align='center'>Y</TableCell>
              <TableCell size='small' align='center'>X</TableCell>
              <TableCell  size='small' align='center'>Y</TableCell>
            </TableRow>
           
          </TableHead>
          <TableBody>
            {constructionItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    name="tenhangmuc"
                    fullWidth
                    size='small'
                    value={consSFData.name}
                    onChange={handleChange('name')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="x"
                    fullWidth
                    size='small'
                    value={consSFData.x}
                    onChange={handleChange('x')}
                   
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="y"
                    fullWidth
                    size='small'
                    value={consSFData.y}
                    onChange={handleChange('y')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="x"
                    fullWidth
                    size='small'
                    value={consSFData.x}
                    onChange={handleChange('lat')}
                   
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="y"
                    fullWidth
                    size='small'
                    value={consSFData.y}
                    onChange={handleChange('lng')}
                  />
                </TableCell>
                <TableCell  size='small' align='center'>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => removeConstructionItem(index)}
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

export default ConsGroundItem
