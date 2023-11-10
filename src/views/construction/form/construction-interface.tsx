export interface ConstructionState {
  id?: number | null
  idLoaiCT?: number | null
  idXa?: string | null
  idHuyen?: string | null
  idSong?: number | null
  idLuuVuc?: number | null
  idTieuLuuVuc?: number | null
  idTangChuaNuoc?: number | null
  taiKhoan?: string | null
  tenCT?: string | null
  maCT?: string | null
  viTriCT?: string | null
  x?: number | null
  y?: number | null
  capCT?: string | null
  namBatDauVanHanh?: number | null
  nguonNuocKT?: string | null
  cheDoKT?: string | null
  mucDichhKT?: string | null
  phuongThucKT?: string | null
  phuongThucXT?: string | null
  cHeDoXT?: string | null
  nguonNuocXT?: string | null
  thoiGianKT?: string | null
  thoiGianHNK?: string | null
  mucDichHNK?: string | null
  mucDichhTD?: string | null
  quyMoHNK?: string | null
  thoiGianXD?: string | null
  soLuongGiengKT?: number | null
  soLuongGiengQT?: number | null
  chuThich?: string | null
  soLuongGieng?: number | null
  khoiLuongCacHangMucTD?: number | null
  qktThietKe?: number | null
  qktThucTe?: number | null
  viTriXT?: string | null
}

export interface ConstructionSpecState {
  id: number | null
  idCT: number | null
  idHangMucCT: number | null
  dienTichLuuVuc: number | null
  muaTrungBinhNam: number | null
  qTrungBinhNam: number | null
  congSuatLM: number | null
  congSuatDamBao: number | null
  chieuCaoDap: number | null
  chieuDaiDap: number | null
  caoTrinhDap: number | null
  qmaxNM: number | null
  qtt: number | null
  qDamBao: number | null
  hmax: number | null
  hmin: number | null
  htoiThieu: number | null
  mnc: number | null
  mndbt: number | null
  mnltk: number | null
  mnlkt: number | null
  dungTichToanBo: number | null
  dungTichChet: number | null
  dungTichHuuIch: number | null
  caoTrinhCong: number | null
  chieuDaiCong: number | null
  chieuRongCong: number | null
  kichThuocCong: number | null
  soLuongMayBom: number | null
  qThietKe: number | null
  qThucTe: number | null
  dienTichTuoiThietKe: number | null
  dienTichTuoiThucTe: number | null
  thoiGianBomTB: number | null
  thoiGianBomNhoNhat: number | null
  thoiGianBomLonNhat: number | null
  chieuSauDoanThuNuocTu: number | null
  chieuSauDoanThuNuocDen: number | null
  qktCapNuocSinhHoat: number | null
  hgieng: number | null
  hGiengKT: number | null
  phuongThucKT: number | null
  mucNuocTinh: number | null
  mucNuocDong: number | null
  tangChuaNuocKT: number | null
  hHaThap: number | null
  luongNuocKT: number | null
  hDatOngLocTu: number | null
  hDatOngLocDen: number | null
  qktLonNhat: number | null
  congSuatBom: number | null
  qXaThaiTB: number | null
  qXaThaiLonNhat: number | null
  kqKf: number | null
  qXaTran: number | null
  qLonNhatTruocLu: number | null
  hlu: number | null
  hThuongLuu: number | null
  hHaLuu: number | null
  qBomThietKe: number | null
  qBomLonNhat: number | null
  hBeHut: number | null
  qXaThai: number | null
  qMaxXaThai: number | null
  qKhaiThac: number | null
  qMaxKT: number | null
}

export const emptyConstructionData: ConstructionState = {
  id: 0,
  idLoaiCT: null,
  idXa: null,
  idHuyen: null,
  idSong: null,
  idLuuVuc: null,
  idTieuLuuVuc: null,
  idTangChuaNuoc: null,
  taiKhoan: null,
  tenCT: null,
  maCT: null,
  viTriCT: null,
  x: null,
  y: null,
  namBatDauVanHanh: null,
  nguonNuocKT: null,
  cheDoKT: null,
  mucDichhKT: null,
  phuongThucKT: null,
  phuongThucXT: null,
  cHeDoXT: null,
  nguonNuocXT: null,
  thoiGianKT: null,
  thoiGianHNK: null,
  mucDichHNK: null,
  mucDichhTD: null,
  quyMoHNK: null,
  thoiGianXD: null,
  soLuongGiengKT: null,
  soLuongGiengQT: null,
  chuThich: null,
  soLuongGieng: null,
  khoiLuongCacHangMucTD: null,
  qktThietKe: null,
  qktThucTe: null,
  viTriXT: null,
}

export const emptyConstructionSpec: ConstructionSpecState = {
  id: null,
  idCT: null,
  idHangMucCT: null,
  dienTichLuuVuc: null,
  muaTrungBinhNam: null,
  qTrungBinhNam: null,
  congSuatLM: null,
  congSuatDamBao: null,
  chieuCaoDap: null,
  chieuDaiDap: null,
  caoTrinhDap: null,
  qmaxNM: null,
  qtt: null,
  qDamBao: null,
  hmax: null,
  hmin: null,
  htoiThieu: null,
  mnc: null,
  mndbt: null,
  mnltk: null,
  mnlkt: null,
  dungTichToanBo: null,
  dungTichChet: null,
  dungTichHuuIch: null,
  caoTrinhCong: null,
  chieuDaiCong: null,
  chieuRongCong: null,
  kichThuocCong: null,
  soLuongMayBom: null,
  qThietKe: null,
  qThucTe: null,
  dienTichTuoiThietKe: null,
  dienTichTuoiThucTe: null,
  thoiGianBomTB: null,
  thoiGianBomNhoNhat: null,
  thoiGianBomLonNhat: null,
  chieuSauDoanThuNuocTu: null,
  chieuSauDoanThuNuocDen: null,
  qktCapNuocSinhHoat: null,
  hgieng: null,
  hGiengKT: null,
  phuongThucKT: null,
  mucNuocTinh: null,
  mucNuocDong: null,
  tangChuaNuocKT: null,
  hHaThap: null,
  luongNuocKT: null,
  hDatOngLocTu: null,
  hDatOngLocDen: null,
  qktLonNhat: null,
  congSuatBom: null,
  qXaThaiTB: null,
  qXaThaiLonNhat: null,
  kqKf: null,
  qXaTran: null,
  qLonNhatTruocLu: null,
  hlu: null,
  hThuongLuu: null,
  hHaLuu: null,
  qBomThietKe: null,
  qBomLonNhat: null,
  hBeHut: null,
  qXaThai: null,
  qMaxXaThai: null,
  qKhaiThac: null,
  qMaxKT: null,
}

// Construction Items State
export interface ConstructionItemState {
  id?: number
  idCT?: number
  idTangChuaNuoc?: number
  tenHangMuc?: string
  viTriHangMuc?: string
  x?: number
  y?: number
}