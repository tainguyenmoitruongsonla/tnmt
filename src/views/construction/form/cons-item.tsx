import { FC, useEffect, useState } from 'react';
import { Alert, Box, Button, ButtonGroup, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { ConstructionItemState, ConstructionSpecState, emptyConstructionSpec } from './construction-interface';
import { Delete } from '@mui/icons-material';

interface ConstructionItemFieldProps {
  data?: ConstructionItemState[]
  type?: any
  onChange: (data: ConstructionItemState[], dataDeleted?: ConstructionItemState[]) => void
}

const ConstructionItem: FC<ConstructionItemFieldProps> = ({ data, type, onChange }) => {
  const initialLicenseFees: ConstructionItemState[] = data
    ? data.map((e: ConstructionItemState) => ({
      id: e.id,
      idCT: e.idCT,
      tenHangMuc: e.tenHangMuc,
      x: e.x,
      y: e.y,
      thongso: {
        id: e.thongso?.id || null,
        idCT: e.thongso?.idCT || null,
        idHangMucCT: e.thongso?.idHangMucCT || null,
        caoTrinhCong: e.thongso?.caoTrinhCong || null,
        cheDoKT: e.thongso?.cheDoKT || null,
        caoTrinhDap: e.thongso?.caoTrinhDap || null,
        cheDoXT: e.thongso?.cheDoXT || null,
        chieuCaoDap: e.thongso?.chieuCaoDap || null,
        chieuDaiCong: e.thongso?.chieuDaiCong || null,
        chieuDaiDap: e.thongso?.chieuDaiDap || null,
        chieuRongCong: e.thongso?.chieuRongCong || null,
        chieuSauDoanThuNuocDen: e.thongso?.chieuSauDoanThuNuocDen || null,
        chieuSauDoanThuNuocTu: e.thongso?.chieuSauDoanThuNuocTu || null,
        congSuatBom: e.thongso?.congSuatBom || null,
        congSuatDamBao: e.thongso?.congSuatDamBao || null,
        congSuatLM: e.thongso?.congSuatLM || null,
        dienTichLuuVuc: e.thongso?.dienTichLuuVuc || null,
        dienTichTuoiThietKe: e.thongso?.dienTichTuoiThietKe || null,
        dienTichTuoiThucTe: e.thongso?.dienTichTuoiThucTe || null,
        dungTichChet: e.thongso?.dungTichChet || null,
        dungTichHuuIch: e.thongso?.dungTichHuuIch || null,
        dungTichToanBo: e.thongso?.dungTichToanBo || null,
        hBeHut: e.thongso?.hBeHut || null,
        hDatOngLocDen: e.thongso?.hDatOngLocDen || null,
        hDatOngLocTu: e.thongso?.hDatOngLocTu || null,
        hDoanThuNuocDen: e.thongso?.hDoanThuNuocDen || null,
        hDoanThuNuocTu: e.thongso?.hDoanThuNuocTu || null,
        hDong: e.thongso?.hDong || null,
        hgieng: e.thongso?.hgieng || null,
        hGiengKT: e.thongso?.hGiengKT || null,
        hHaLuu: e.thongso?.hHaLuu || null,
        hHaThap: e.thongso?.hHaThap || null,
        hlu: e.thongso?.hlu || null,
        hmax: e.thongso?.hmax || null,
        hmin: e.thongso?.hmin || null,
        hThuongLuu: e.thongso?.hThuongLuu || null,
        hTinh: e.thongso?.hTinh || null,
        htoiThieu: e.thongso?.htoiThieu || null,
        kichThuocCong: e.thongso?.kichThuocCong || null,
        kqKf: e.thongso?.kqKf || null,
        luongNuocKT: e.thongso?.luongNuocKT || null,
        mnc: e.thongso?.mnc || null,
        mndbt: e.thongso?.mndbt || null,
        mnlkt: e.thongso?.mnlkt || null,
        mnltk: e.thongso?.mnltk || null,
        muaTrungBinhNam: e.thongso?.muaTrungBinhNam || null,
        mucNuocDong: e.thongso?.mucNuocDong || null,
        mucNuocTinh: e.thongso?.mucNuocTinh || null,
        phuongThucXT: e.thongso?.phuongThucXT || null,
        qBomLonNhat: e.thongso?.qBomLonNhat || null,
        qBomThietKe: e.thongso?.qBomThietKe || null,
        qDamBao: e.thongso?.qDamBao || null,
        qKhaiThac: e.thongso?.qKhaiThac || null,
        qktCapNuocSinhHoat: e.thongso?.qktCapNuocSinhHoat || null,
        qktLonNhat: e.thongso?.qktLonNhat || null,
        qLonNhatTruocLu: e.thongso?.qLonNhatTruocLu || null,
        qMaxKT: e.thongso?.qMaxKT || null,
        qmaxNM: e.thongso?.qmaxNM || null,
        qMaxXaThai: e.thongso?.qMaxXaThai || null,
        qThietKe: e.thongso?.qThietKe || null,
        qThucTe: e.thongso?.qThucTe || null,
        qTrungBinhNam: e.thongso?.qTrungBinhNam || null,
        qtt: e.thongso?.qtt || null,
        qXaThai: e.thongso?.qXaThai || null,
        qXaThaiLonNhat: e.thongso?.qXaThaiLonNhat || null,
        qXaThaiTB: e.thongso?.qXaThaiTB || null,
        qXaTran: e.thongso?.qXaTran || null,
        soLuongMayBom: e.thongso?.soLuongMayBom || null,
        thoiGianBomLonNhat: e.thongso?.thoiGianBomLonNhat || null,
        thoiGianBomNhoNhat: e.thongso?.thoiGianBomNhoNhat || null,
        thoiGianBomTB: e.thongso?.thoiGianBomTB || null,
      }
    }))
    : []

  const [constructionItems, setConstructionItems] = useState<ConstructionItemState[]>(initialLicenseFees);
  const [itemDelete, setItemDelete] = useState<ConstructionItemState[]>([]);

  const addConstructionItem = () => {
    const newItem: ConstructionItemState = {
      id: undefined,
      idCT: undefined,
      tenHangMuc: '',
      x: undefined,
      y: undefined,
      thongso: emptyConstructionSpec
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

  const handleChange = (index: number, prop: keyof ConstructionItemState | keyof ConstructionSpecState) => (value: any) => {
    const newConstructionItems = [...constructionItems];

    if (
      newConstructionItems[index]?.thongso &&
      prop in newConstructionItems[index].thongso!
    ) {
      newConstructionItems[index].thongso![prop as keyof ConstructionSpecState] = value;
      console.log(index, value)
    } else {
      newConstructionItems[index][prop as keyof ConstructionItemState] = value;
    }

    setConstructionItems(newConstructionItems);

    // Call onChange after the state update
    onChange(newConstructionItems, itemDelete);
  };

  useEffect(() => {
    onChange(constructionItems, itemDelete)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructionItems, itemDelete])

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>
          {
            type == 1 ? "CÁC HẠNG MỤC CỦA CÔNG TRÌNH" :
              type == 2 ? "DANH SÁCH GIẾNG" :
                type == 3 ? "CÁC ĐIỂM XẢ THẢI" : ""
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
              <TableCell size='small' align='center' rowSpan={2} width={350}>
                {type == 1 ? "Tên hạng mục" : "Số hiệu"}
              </TableCell>
              <TableCell size='small' align='center' colSpan={2}>
                Toạ độ(VN2000)
              </TableCell>
              {type == 2 ?
                <TableCell size='small' align='center' rowSpan={2} width={150}>
                  Q  KT<sub>(m3/ngày.đêm)</sub>
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' rowSpan={2} width={150}>
                  Chế độ KT
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' colSpan={2}>
                  h <sub>đoạn thu nước</sub>
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' colSpan={2}>
                  h
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' colSpan={2}>
                  h <sub>đặt ống lọc</sub>
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  Địa điểm
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  PT xả thải
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  Chế độ xả
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={150}>
                  Q nước thải <sub>(m3/ngày.đêm)</sub>
                </TableCell>
                : ""
              }
              <TableCell size='small' align='center' padding='checkbox'>
                <Button className='btn-link' onClick={addConstructionItem}>
                  Thêm
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size='small' align='center' width={150}>
                X
              </TableCell>
              <TableCell size='small' align='center' width={150}>
                Y
              </TableCell>
              {type == 2 ?
                <TableCell size='small' align='center' width={75}>
                  Từ(m)
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' width={75}>
                  Đến(m)
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' width={75}>
                  H<sub>tĩnh</sub>
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' width={75}>
                  H<sub>động</sub>
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' width={75}>
                  Từ(m)
                </TableCell>
                : ""
              }
              {type == 2 ?
                <TableCell size='small' align='center' width={75}>
                  Đến(m)
                </TableCell>
                : ""
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {constructionItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                <TableCell padding='checkbox'>
                  <TextField
                    name='tenhangmuc'
                    fullWidth
                    placeholder='Tên hạng mục'
                    size='small'
                    value={item.tenHangMuc}
                    onChange={event => handleChange(index, 'tenHangMuc')(event.target.value)}
                  />
                </TableCell>
                <TableCell padding='checkbox'>
                  <TextField
                    name='x'
                    fullWidth
                    placeholder='Toạ độ X'
                    size='small'
                    value={item.x}
                    onChange={event => handleChange(index, 'x')(event.target.value)}
                  />
                </TableCell>
                <TableCell padding='checkbox'>
                  <TextField
                    name='y'
                    fullWidth
                    placeholder='Toạ độ Y'
                    size='small'
                    value={item.y}
                    onChange={event => handleChange(index, 'y')(event.target.value)}
                  />
                </TableCell>
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='qKhaiThac'
                      fullWidth
                      placeholder='Lưu lượng khai thác'
                      size='small'
                      multiline
                      value={item.thongso?.qKhaiThac}
                      onChange={event => handleChange(index, 'qKhaiThac')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='cheDoKT'
                      fullWidth
                      placeholder='Chế độ khai thác'
                      size='small'
                      multiline
                      value={item.thongso?.cheDoKT}
                      onChange={event => handleChange(index, 'cheDoKT')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='hDoanThuNuocTu'
                      fullWidth
                      placeholder='Từ'
                      size='small'
                      value={item.thongso?.hDoanThuNuocTu}
                      onChange={event => handleChange(index, 'hDoanThuNuocTu')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='hDoanThuNuocDen'
                      fullWidth
                      placeholder='Đến'
                      size='small'
                      value={item.thongso?.hDoanThuNuocDen}
                      onChange={event => handleChange(index, 'hDoanThuNuocDen')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='hTinh'
                      fullWidth
                      placeholder='H tĩnh'
                      size='small'
                      value={item.thongso?.hTinh}
                      onChange={event => handleChange(index, 'hTinh')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='hDong'
                      fullWidth
                      placeholder='H động'
                      size='small'
                      value={item.thongso?.hDong}
                      onChange={event => handleChange(index, 'hDong')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='hDatOngLocTu'
                      fullWidth
                      placeholder='Từ'
                      size='small'
                      value={item.thongso?.hDatOngLocTu}
                      onChange={event => handleChange(index, 'hDatOngLocTu')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 2 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='hDatOngLocDen'
                      fullWidth
                      placeholder='Đến'
                      size='small'
                      value={item.thongso?.hDatOngLocDen}
                      onChange={event => handleChange(index, 'hDatOngLocDen')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='viTriHangMuc'
                      fullWidth
                      placeholder='Địa điểm'
                      size='small'
                      multiline
                      value={item?.viTriHangMuc}
                      onChange={event => handleChange(index, 'viTriHangMuc')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='phuongThucXT'
                      fullWidth
                      placeholder='Phương thức xả thải'
                      size='small'
                      multiline
                      value={item.thongso?.phuongThucXT}
                      onChange={event => handleChange(index, 'phuongThucXT')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='cheDoXT'
                      fullWidth
                      placeholder='Chế độ xả thải'
                      size='small'
                      multiline
                      value={item.thongso?.cheDoXT}
                      onChange={event => handleChange(index, 'cheDoXT')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    <TextField
                      name='qXaThai'
                      fullWidth
                      placeholder=' '
                      size='small'
                      value={item.thongso?.qXaThai}
                      onChange={event => handleChange(index, 'qXaThai')(event.target.value)}
                    />
                  </TableCell> : ""
                }
                <TableCell size='small' align='center' padding='checkbox'>
                  <>
                    <IconButton
                      aria-describedby={`${item.tenHangMuc}-${index}`}
                      onClick={(event) => DeleteRowData(event, index)} // Pass the index here
                      data-row-id={`${item.tenHangMuc}-${index}`}
                    >
                      <Delete className='tableActionBtn deleteBtn' />
                    </IconButton>
                    <Popover
                      id={deleteConfirmOpen ? `${item.tenHangMuc}-${index}` : undefined}
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
