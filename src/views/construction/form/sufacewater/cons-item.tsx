import { FC, useEffect, useState } from 'react';
import { Alert, Box, Button, ButtonGroup, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { ConstructionItemState } from '../construction-interface';
import { Delete } from '@mui/icons-material';

interface ConstructionItemFieldProps {
  data?: ConstructionItemState[]
  onChange: (data: ConstructionItemState[], dataDeleted: ConstructionItemState[]) => void
}

const ConstructionItem: FC<ConstructionItemFieldProps> = ({ data, onChange }) => {
  const initialLicenseFees: ConstructionItemState[] = data
    ? data.map((e: ConstructionItemState) => ({
        id: e.id,
        constructionId: e.constructionId,
        name: e.name,
        x: e.x,
        y: e.y,
        lat: e.lat,
        lng: e.lng,
       
      }))
    : []

  const [constructionItems, setConstructionItems] = useState<ConstructionItemState[]>(initialLicenseFees);
  const [itemDelete, setItemDelete] = useState<ConstructionItemState[]>([]);

  const addConstructionItem = () => {
    const newItem: ConstructionItemState = {
      id: 0,
      constructionId: 0,
      name: '',
      x: 0,
      y: 0,
      lat: 0,
      lng: 0,
      
    }
    setConstructionItems(prevItems => [...prevItems, newItem])
  }

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
    setConstructionItems((prevItems) => {
      const newItems = [...prevItems];
      const removedItem = newItems.splice(index, 1)[0];

      if (removedItem?.id !== undefined && removedItem?.id > 0) {
        setItemDelete(prevDeletedItems => [...prevDeletedItems, removedItem])
      }

      return newItems
    })

    // Call onChange after the state update
    onChange(constructionItems, itemDelete);
    setDeleteConfirmAnchorEl(null);
  };

  const handleChange = (index: number, prop: keyof ConstructionItemState) => (value: any) => {
    const newConstructionItems = [...constructionItems]
    newConstructionItems[index][prop] = value
    setConstructionItems(newConstructionItems)

    // Call onChange after the state update
    onChange(newConstructionItems, itemDelete)
  }

  useEffect(() => {
    onChange(constructionItems, itemDelete)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructionItems, itemDelete])

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>
          VỊ TRÍ CÁC HẠNG MỤC CHÍNH CỦA CÔNG TRÌNH KHAI THÁC SỬ DỤNG NƯỚC
        </Typography>
      </legend>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell size='small' align='center'>
                TT
              </TableCell>
              <TableCell size='small' align='center'>
                Hạng mục
              </TableCell>
              <TableCell size='small' align='center'>
                X(VN2000)
              </TableCell>
              <TableCell size='small' align='center'>
                Y(VN2000)
              </TableCell>
              <TableCell size='small' align='center'>
                Lat(WGS84)
              </TableCell>
              <TableCell size='small' align='center'>
                Long(WGS84)
              </TableCell>
              <TableCell size='small' align='center' sx={{ maxWidth: 50 }}>
                <Button className='btn-link' onClick={addConstructionItem}>
                  Thêm
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {constructionItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    name='tenhangmuc'
                    fullWidth
                    placeholder='Tên hạng mục'
                    size='small'
                    value={item.name}
                    onChange={event => handleChange(index, 'name')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='x'
                    fullWidth
                    placeholder='Tọa độ X (VN2000)'
                    size='small'
                    value={item.x}
                    onChange={event => handleChange(index, 'x')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='y'
                    fullWidth
                    placeholder='Tọa độ Y (VN2000)'
                    size='small'
                    value={item.y}
                    onChange={event => handleChange(index, 'y')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='lat'
                    fullWidth
                    placeholder='Tọa độ Lat(WGS84)'
                    size='small'
                    value={item.lat}
                    onChange={event => handleChange(index, 'lat')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='lng'
                    fullWidth
                    placeholder='Tọa độ Long(WGS84)'
                    size='small'
                    value={item.lng}
                    onChange={event => handleChange(index, 'lng')(event.target.value)}
                  />
                </TableCell>

                <TableCell size='small' align='center'>
                  <>
                    <IconButton
                      aria-describedby={`${item.name}-${index}`}
                      onClick={(event) => DeleteRowData(event, index)} // Pass the index here
                      data-row-id={`${item.name}-${index}`}
                    >
                      <Delete className='tableActionBtn deleteBtn' />
                    </IconButton>
                    <Popover
                      id={deleteConfirmOpen ? `${item.name}-${index}` : undefined}
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
      </TableContainer>
    </fieldset>
  )
}

export default ConstructionItem
