export interface ConstructionState {
  id?: number | null;
  idLoaiCT?: number | null;
  idHuyen?: string | null;
  idXa?: string | null;
  idSong?: number | null;
  idLuuVuc?: number | null;
  idTieuLuuVuc?: number | null;
  idTangChuaNuoc?: number | null;
  tenCT?: string | null;
  maCT?: string | null;
  viTriCT?: string | null;
  x?: number | null;
  y?: number | null;
  capCT?: string | null;
  namBatDauVanHanh?: number | null;
  nguonNuocKT?: string | null;
  mucDichhKT?: string | null;
  phuongThucKT?: string | null;
  nguonNuocXT?: string | null;
  thoiGianKT?: string | null;
  thoiGianHNK?: string | null;
  mucDichHNK?: string | null;
  mucDichhTD?: string | null;
  quyMoHNK?: string | null;
  thoiGianXD?: string | null;
  soLuongGiengKT?: number | null;
  soLuongGiengQT?: number | null;
  soDiemXaThai?: number | null;
  soLuongGieng?: number | null;
  khoiLuongCacHangMucTD?: number | null;
  qktThietKe?: number | null;
  qktThucTe?: number | null;
  viTriXT?: string | null;
  taiKhoan?: string | null;
  chuThich?: string | null;
}

export interface ConstructionSpecState {
  id: number | null;
  idCT: number | null;
  idHangMucCT: number | null;
  caoTrinhCong: number | null;
  cheDoKT: string | null;
  caoTrinhDap: number | null;
  cheDoXT: string | null;
  chieuCaoDap: number | null;
  chieuDaiCong: number | null;
  chieuDaiDap: number | null;
  chieuRongCong: number | null;
  chieuSauDoanThuNuocDen: number | null;
  chieuSauDoanThuNuocTu: number | null;
  congSuatBom: number | null;
  congSuatDamBao: number | null;
  congSuatLM: number | null;
  dienTichLuuVuc: number | null;
  dienTichTuoiThietKe: number | null;
  dienTichTuoiThucTe: number | null;
  dungTichChet: number | null;
  dungTichHuuIch: number | null;
  dungTichToanBo: number | null;
  hBeHut: number | null;
  hDatOngLocDen: number | null;
  hDatOngLocTu: number | null;
  hDoanThuNuocDen: number | null;
  hDoanThuNuocTu: number | null;
  hDong: number | null;
  hgieng: number | null;
  hGiengKT: number | null;
  hHaLuu: number | null;
  hHaThap: number | null;
  hlu: number | null;
  hmax: number | null;
  hmin: number | null;
  hThuongLuu: number | null;
  hTinh: number | null;
  htoiThieu: number | null;
  kichThuocCong: number | null;
  kqKf: number | null;
  luongNuocKT: number | null;
  mnc: number | null;
  mndbt: number | null;
  mnlkt: number | null;
  mnltk: number | null;
  muaTrungBinhNam: number | null;
  mucNuocDong: number | null;
  mucNuocTinh: number | null;
  phuongThucXT: string | null;
  qBomLonNhat: number | null;
  qBomThietKe: number | null;
  qDamBao: number | null;
  qKhaiThac: number | null;
  qktCapNuocSinhHoat: number | null;
  qktLonNhat: number | null;
  qLonNhatTruocLu: number | null;
  qMaxKT: number | null;
  qmaxNM: number | null;
  qMaxXaThai: number | null;
  qThietKe: number | null;
  qThucTe: number | null;
  qTrungBinhNam: number | null;
  qtt: number | null;
  qXaThai: number | null;
  qXaThaiLonNhat: number | null;
  qXaThaiTB: number | null;
  qXaTran: number | null;
  soLuongMayBom: number | null;
  thoiGianBomLonNhat: number | null;
  thoiGianBomNhoNhat: number | null;
  thoiGianBomTB: number | null;
}

export const emptyConstructionData: ConstructionState = {
  id: null,
  idLoaiCT: null,
  idHuyen: null,
  idXa: null,
  idSong: null,
  idLuuVuc: null,
  idTieuLuuVuc: null,
  idTangChuaNuoc: null,
  tenCT: null,
  maCT: null,
  viTriCT: null,
  x: null,
  y: null,
  capCT: null,
  namBatDauVanHanh: null,
  nguonNuocKT: null,
  mucDichhKT: null,
  phuongThucKT: null,
  nguonNuocXT: null,
  thoiGianKT: null,
  thoiGianHNK: null,
  mucDichHNK: null,
  mucDichhTD: null,
  quyMoHNK: null,
  thoiGianXD: null,
  soLuongGiengKT: null,
  soLuongGiengQT: null,
  soDiemXaThai: null,
  soLuongGieng: null,
  khoiLuongCacHangMucTD: null,
  qktThietKe: null,
  qktThucTe: null,
  viTriXT: null,
  taiKhoan: null,
  chuThich: null,
}

export const emptyConstructionSpec: ConstructionSpecState = {
  id: null,
  idCT: null,
  idHangMucCT: null,
  caoTrinhCong: null,
  cheDoKT: null,
  caoTrinhDap: null,
  cheDoXT: null,
  chieuCaoDap: null,
  chieuDaiCong: null,
  chieuDaiDap: null,
  chieuRongCong: null,
  chieuSauDoanThuNuocDen: null,
  chieuSauDoanThuNuocTu: null,
  congSuatBom: null,
  congSuatDamBao: null,
  congSuatLM: null,
  dienTichLuuVuc: null,
  dienTichTuoiThietKe: null,
  dienTichTuoiThucTe: null,
  dungTichChet: null,
  dungTichHuuIch: null,
  dungTichToanBo: null,
  hBeHut: null,
  hDatOngLocDen: null,
  hDatOngLocTu: null,
  hDoanThuNuocDen: null,
  hDoanThuNuocTu: null,
  hDong: null,
  hgieng: null,
  hGiengKT: null,
  hHaLuu: null,
  hHaThap: null,
  hlu: null,
  hmax: null,
  hmin: null,
  hThuongLuu: null,
  hTinh: null,
  htoiThieu: null,
  kichThuocCong: null,
  kqKf: null,
  luongNuocKT: null,
  mnc: null,
  mndbt: null,
  mnlkt: null,
  mnltk: null,
  muaTrungBinhNam: null,
  mucNuocDong: null,
  mucNuocTinh: null,
  phuongThucXT: null,
  qBomLonNhat: null,
  qBomThietKe: null,
  qDamBao: null,
  qKhaiThac: null,
  qktCapNuocSinhHoat: null,
  qktLonNhat: null,
  qLonNhatTruocLu: null,
  qMaxKT: null,
  qmaxNM: null,
  qMaxXaThai: null,
  qThietKe: null,
  qThucTe: null,
  qTrungBinhNam: null,
  qtt: null,
  qXaThai: null,
  qXaThaiLonNhat: null,
  qXaThaiTB: null,
  qXaTran: null,
  soLuongMayBom: null,
  thoiGianBomLonNhat: null,
  thoiGianBomNhoNhat: null,
  thoiGianBomTB: null,
}

export interface ConstructionItemState {
  id?: number
  idCT?: number
  idTangChuaNuoc?: number
  tenHangMuc?: string
  viTriHangMuc?: string
  x?: number
  y?: number
  thongso?: ConstructionSpecState
}

export interface MiningPurposeState {
  id?: number
  idCT?: number
  mucDich?: string
  luuLuong?: number
  donViDo?: string
  ghiChu?: string
}