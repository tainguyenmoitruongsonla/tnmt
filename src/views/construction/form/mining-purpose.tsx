import { FC, useEffect, useState } from 'react';
import { Alert, Box, Button, ButtonGroup, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { MiningPurposeState } from './construction-interface';
import { Delete } from '@mui/icons-material';

interface MiningPurposeFieldProps {
  data?: MiningPurposeState[]
  type?: any;
  onChange: (data: MiningPurposeState[], dataDeleted: MiningPurposeState[]) => void
}

const MiningPurpose: FC<MiningPurposeFieldProps> = ({ data, type, onChange }) => {
  const initialLicenseFees: MiningPurposeState[] = data
    ? data.map((e: MiningPurposeState) => ({
      id: e.id,
      idCT: e.idCT,
      mucDich: e.mucDich,
      luuLuong: e.luuLuong,
      donViDo: e.donViDo,
      ghiChu: e.ghiChu
    }))
    : []

  const [MiningPurposes, setMiningPurposes] = useState<MiningPurposeState[]>(initialLicenseFees);
  const [itemDelete, setItemDelete] = useState<MiningPurposeState[]>([]);

  const addMiningPurpose = () => {
    const newItem: MiningPurposeState = {
      id: 0,
      idCT: 0,
      mucDich: '',
      luuLuong: 0,
      donViDo: '',
      ghiChu: '',
    }
    setMiningPurposes(prevItems => [...prevItems, newItem])
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
    setMiningPurposes((prevItems) => {
      const newItems = [...prevItems];
      const removedItem = newItems.splice(index, 1)[0];

      if (removedItem?.id !== undefined && removedItem?.id > 0) {
        setItemDelete(prevDeletedItems => [...prevDeletedItems, removedItem])
      }

      return newItems
    })

    // Call onChange after the state update
    onChange(MiningPurposes, itemDelete);
    setDeleteConfirmAnchorEl(null);
  };

  const handleChange = (index: number, prop: keyof MiningPurposeState) => (value: any) => {
    const newMiningPurposes = [...MiningPurposes]
    newMiningPurposes[index][prop] = value
    setMiningPurposes(newMiningPurposes)

    // Call onChange after the state update
    onChange(newMiningPurposes, itemDelete)
  }

  useEffect(() => {
    onChange(MiningPurposes, itemDelete)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MiningPurposes, itemDelete])

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>
          {
            type == 1 ? "Lưu lượng theo mục đích khai thác sử dụng" :
              type == 2 ? "Lưu lượng theo mục đích thăm dò" :
                type == 3 ? "Lưu lượng theo mục đích xả thải" : ""
          }
        </Typography>
      </legend>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell size='small' align='center' rowSpan={2} width={50}>
                #
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2} width={500}>
                Mục đích
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Lưu lượng
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Đơn vị đo
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Ghi chú
              </TableCell>
              <TableCell size='small' align='center' padding='checkbox'>
                <Button className='btn-link' onClick={addMiningPurpose}>
                  Thêm
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MiningPurposes.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    name='mucDich'
                    fullWidth
                    placeholder=' '
                    size='small'
                    value={item.mucDich}
                    onChange={event => handleChange(index, 'mucDich')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='luuLuong'
                    fullWidth
                    placeholder=' '
                    size='small'
                    value={item.luuLuong}
                    onChange={event => handleChange(index, 'luuLuong')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='donViDo'
                    fullWidth
                    placeholder=' '
                    size='small'
                    value={item.donViDo}
                    onChange={event => handleChange(index, 'donViDo')(event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='ghiChu'
                    fullWidth
                    placeholder=' '
                    size='small'
                    value={item.ghiChu}
                    onChange={event => handleChange(index, 'ghiChu')(event.target.value)}
                  />
                </TableCell>
                <TableCell size='small' align='center' padding='checkbox'>
                  <>
                    <IconButton
                      aria-describedby={`${item.mucDich}-${index}`}
                      onClick={(event) => DeleteRowData(event, index)} // Pass the index here
                      data-row-id={`${item.mucDich}-${index}`}
                    >
                      <Delete className='tableActionBtn deleteBtn' />
                    </IconButton>
                    <Popover
                      id={deleteConfirmOpen ? `${item.mucDich}-${index}` : undefined}
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

export default MiningPurpose
