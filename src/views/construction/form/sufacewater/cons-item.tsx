import { FC, useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

interface ConstructionItemState {
  id?: number;
  constructionId?: number;
  name?: string;
  x?: number;
  y?: number;
}

interface ConstructionItemFieldProps {
  data?: ConstructionItemState[];
  onChange: (data: ConstructionItemState[], dataDeleted: ConstructionItemState[]) => void;
}

const ConstructionItem: FC<ConstructionItemFieldProps> = ({ data, onChange }) => {

  const initialLicenseFees: ConstructionItemState[] = data ? data.map((e: ConstructionItemState) => ({
    id: e.id,
    constructionId: e.constructionId,
    name: e.name,
    x: e.x,
    y: e.y,
  })) : [];


  const [constructionItems, setConstructionItems] = useState<ConstructionItemState[]>(initialLicenseFees);
  const [itemDelete, setItemDelete] = useState<ConstructionItemState[]>([]);

  const addConstructionItem = () => {
    const newItem: ConstructionItemState = {
      id: 0,
      constructionId: 0,
      name: '',
      x: 0,
      y: 0,
    };
    setConstructionItems((prevItems) => [...prevItems, newItem]);
  };

  const removeConstructionItem = (index: number) => {
    setConstructionItems((prevItems) => {
      const newItems = [...prevItems];
      const removedItem = newItems.splice(index, 1)[0];

      if (removedItem?.id !== undefined && removedItem?.id > 0) {
        setItemDelete((prevDeletedItems) => [...prevDeletedItems, removedItem]);
      }

      return newItems;
    });

    // Call onChange after the state update
    onChange(constructionItems, itemDelete);
  };

  const handleChange = (index: number, prop: keyof ConstructionItemState) => (value: any) => {
    const newConstructionItems = [...constructionItems];
    newConstructionItems[index][prop] = value;
    setConstructionItems(newConstructionItems);

    // Call onChange after the state update
    onChange(newConstructionItems, itemDelete);
  };

  useEffect(() => {
    onChange(constructionItems, itemDelete);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructionItems, itemDelete]);

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>VỊ TRÍ CÁC HẠNG MỤC CHÍNH CỦA CÔNG TRÌNH KHAI THÁC SỬ DỤNG NƯỚC</Typography>
      </legend>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell size='small' align='center'>TT</TableCell>
              <TableCell size='small' align='center'>Hạng mục</TableCell>
              <TableCell size='small' align='center'>Tọa độ X</TableCell>
              <TableCell size='small' align='center'>Tọa độ Y</TableCell>
              <TableCell size='small' align='center'>
                <Button className='btn-link' onClick={addConstructionItem}>Thêm</Button>
              </TableCell>
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
                    value={item.name}
                    onChange={(event) => handleChange(index, 'name')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="x"
                    fullWidth
                    size='small'
                    value={item.x}
                    onChange={(event) => handleChange(index, 'x')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="y"
                    fullWidth
                    size='small'
                    value={item.y}
                    onChange={(event) => handleChange(index, 'y')(event.target.value)}
                  />
                </TableCell>
                <TableCell size='small' align='center'>
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

export default ConstructionItem
