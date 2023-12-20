import { FC, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, Button, ButtonGroup, Fade, Grid, IconButton, Modal, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { MiningPurposeState } from './construction-interface';
import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material';

interface MiningPurposeFieldProps {
  data?: MiningPurposeState[]
  type?: any;
  onChange: (data: MiningPurposeState[], dataDeleted: MiningPurposeState[]) => void
}

const MiningPurpose: FC<MiningPurposeFieldProps> = ({ data, type, onChange }) => {
  const initialLicenseFees: MiningPurposeState[] = data
    ? data.map((e: MiningPurposeState) => ({
      id: e.id || undefined,
      idCT: e.idCT || undefined,
      mucDich: e.mucDich || undefined,
      luuLuong: e.luuLuong || undefined,
      donViDo: e.donViDo || undefined,
      ghiChu: e.ghiChu || undefined,
    }))
    : []

  const [miningPurposes, setMiningPurposes] = useState<MiningPurposeState[]>(initialLicenseFees);
  const [newMiniPurposeIndex, setNewMiniPurposeIndex] = useState(-1)
  const [newMiniPurpose, setNewMiniPurpose] = useState<MiningPurposeState>({
    id: 0,
    idCT: 0,
    mucDich: '',
    luuLuong: undefined,
    donViDo: '',
    ghiChu: ''
  })
  const [itemDelete, setItemDelete] = useState<MiningPurposeState[]>([]);
  const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null);
  const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
  const [required, setRequire] = useState<string | null>(null)

  const DeleteRowData = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setDeleteConfirmAnchorEl(event.currentTarget);
    setDeleteTargetIndex(index);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmAnchorEl(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetIndex !== null) {
      deleteItem(deleteTargetIndex); // Pass the index here
      setDeleteTargetIndex(null);
    }

    setDeleteConfirmAnchorEl(null);
  };

  const deleteItem = (index: number) => {
    setMiningPurposes((prevItems) => {
      const newItems = [...prevItems];
      const removedItem = newItems.splice(index, 1)[0];

      if (removedItem?.id !== undefined && removedItem?.id > 0) {
        setItemDelete(prevDeletedItems => [...prevDeletedItems, removedItem])
      }

      return newItems
    })

    // Call onChange after the state update
    onChange([...miningPurposes], [...itemDelete]);
    setDeleteConfirmAnchorEl(null);
  };

  const handleChange = (prop: keyof MiningPurposeState) => (value: any) => {
    setNewMiniPurpose(prevItem => {
      const newItem: MiningPurposeState = { ...prevItem };
      (newItem as any)[prop] = value;

      return newItem;
    });
  }

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (index: number, e: any, func: "add" | "update") => {
    setOpenModal(true);
    setNewMiniPurposeIndex(index)
    if (func === 'add') {
      // Set all properties of newMiniPurpose to null
      const nullValue = Object.fromEntries(
        Object.keys(newMiniPurpose || {}).map(key => [key, null])
      );

      setNewMiniPurpose({ ...nullValue });
    }

    if (func === 'update') {
      setNewMiniPurpose({ ...e });
    }
  }

  const handleSave = () => {
    if (newMiniPurpose.mucDich !== undefined) {
      if (newMiniPurposeIndex > 0) {
        setMiningPurposes(prevItems => {
          const updatedItems = [...prevItems];
          updatedItems[newMiniPurposeIndex] = newMiniPurpose;

          return updatedItems;
        });
      } else {
        setMiningPurposes(prevItems => [...prevItems, newMiniPurpose]);
      }

      onChange([...miningPurposes], [...itemDelete]);
      setNewMiniPurposeIndex(-1)
      handleCloseModal();
    } else {
      setRequire("Mục đích không được để trống");
    }
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  useEffect(() => {
    onChange([...miningPurposes], [...itemDelete])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miningPurposes, itemDelete])

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>
          {
            type == 1 || type == 7 ? "Lưu lượng theo mục đích khai thác sử dụng" :
              type == 8 ? "Lưu lượng theo mục đích thăm dò" :
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
              <TableCell size='small' align='center' padding='checkbox' rowSpan={2} width={50}>
                <Box>
                  <IconButton aria-label="add" className='tableActionBtn' onClick={() => handleOpenModal(0, null, 'add')}>
                    <Add />
                  </IconButton>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={openModal}>
                      <Box sx={{ ...style, width: 600 }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" align="center" py={3}>
                          {
                            type == 1 || type == 2 || type == 7 || type == 8 || type == 9 ? "LƯU LƯỢNG THEO MỤC ĐÍCH KHAI THÁC" :
                              type == 3 ? "LƯU LƯỢNG THEO MỤC ĐÍCH XẢ THẢI" : "LƯU LƯỢNG THEO MỤC ĐÍCH"
                          }
                        </Typography>
                        {required ? <Alert sx={{ my: 2 }} severity="warning">{required}</Alert> : null}
                        <Grid container spacing={4}>
                          <Grid item md={12}>
                            <TextField
                              name='mucDich'
                              fullWidth
                              label='Mục đích'
                              placeholder='Mục đích'
                              size='small'
                              value={newMiniPurpose.mucDich || ''}
                              onChange={event => handleChange('mucDich')(event.target.value)}
                            />
                          </Grid>
                          <Grid item md={6}>
                            <TextField
                              name='luuLuong'
                              fullWidth
                              label='Lưu lượng'
                              placeholder='Lưu lượng'
                              size='small'
                              value={newMiniPurpose.luuLuong || ''}
                              onChange={event => handleChange('luuLuong')(event.target.value)}
                            />
                          </Grid>
                          <Grid item md={6}>
                            <TextField
                              name='donViDo'
                              fullWidth
                              label='Đơn vị đo'
                              placeholder='Đơn vị đo'
                              size='small'
                              value={newMiniPurpose.donViDo || ''}
                              onChange={event => handleChange('donViDo')(event.target.value)}
                            />
                          </Grid>
                          <Grid item md={12}>
                            <TextField
                              name='ghiChu'
                              fullWidth
                              label='Ghi chú'
                              placeholder='Ghi chú'
                              size='small'
                              value={newMiniPurpose.ghiChu || ''}
                              onChange={event => handleChange('ghiChu')(event.target.value)}
                              multiline
                              rows={4}
                            />
                          </Grid>
                        </Grid>
                        <Grid item sx={{ display: "flex", justifyContent: "end", py: 2 }}>
                          <Button startIcon={<Save />}
                            sx={{ ml: 1 }}
                            variant='outlined'
                            color='primary'
                            onClick={handleSave}>
                            Lưu
                          </Button>
                          <Button startIcon={<Cancel />}
                            sx={{ ml: 1 }}
                            variant='outlined'
                            color='error'
                            onClick={handleCloseModal}>
                            Huỷ
                          </Button>
                        </Grid>
                      </Box>
                    </Fade>
                  </Modal>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {miningPurposes.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item.mucDich}
                </TableCell>
                <TableCell>
                  {item.luuLuong}
                </TableCell>
                <TableCell>
                  {item.donViDo}
                </TableCell>
                <TableCell>
                  {item.ghiChu}
                </TableCell>
                <TableCell size='small' align='center' padding='checkbox'>
                  <Box display={'flex'}>
                    <IconButton
                      aria-describedby={`${item.mucDich}-${index}`}
                      onClick={() => handleOpenModal(index, item, 'update')}
                      data-row-id={`${item.mucDich}-${index}`}
                    >
                      <Edit className='tableActionBtn' />
                    </IconButton>
                    <IconButton
                      aria-describedby={`${item.mucDich}-${index}`}
                      onClick={(event) => DeleteRowData(event, index)}
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
                  </Box>
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
