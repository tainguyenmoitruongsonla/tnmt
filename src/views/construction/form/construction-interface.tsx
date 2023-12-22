export interface propConsDataState {
  congtrinh?: ConstructionState | null | undefined;
  thongso_ct?: ConstructionSpecState | null | undefined;
  hangmuc_ct?: ConstructionItemState[] | null | undefined;
  hangmuc_ct_xoa?: ConstructionItemState[] | null | undefined;
  luuluongtheo_mucdich?: MiningPurposeState[] | null | undefined;
  luuluongtheo_mucdich_xoa?: MiningPurposeState[] | null | undefined;
}

export interface ConstructionState {
  id?: number | null | undefined;
  idLoaiCT?: number | null | undefined;
  idHuyen?: string | null | undefined;
  idXa?: string | null | undefined;
  idSong?: number | null | undefined;
  idLuuVuc?: number | null | undefined;
  idTieuLuuVuc?: number | null | undefined;
  idTangChuaNuoc?: number | null | undefined;
  tenCT?: string | null | undefined;
  maCT?: string | null | undefined;
  viTriCT?: string | null | undefined;
  x?: number | null | undefined;
  y?: number | null | undefined;
  capCT?: string | null | undefined;
  namBatDauVanHanh?: number | null | undefined;
  nguonNuocKT?: string | null | undefined;
  mucDichhKT?: string | null | undefined;
  phuongThucKT?: string | null | undefined;
  nguonNuocXT?: string | null | undefined;
  thoiGianKT?: string | null | undefined;
  thoiGianHNK?: string | null | undefined;
  mucDichHNK?: string | null | undefined;
  mucDichhTD?: string | null | undefined;
  quyMoHNK?: string | null | undefined;
  thoiGianXD?: string | null | undefined;
  soLuongGiengKT?: number | null | undefined;
  soLuongGiengQT?: number | null | undefined;
  soDiemXaThai?: number | null | undefined;
  soLuongGieng?: number | null | undefined;
  khoiLuongCacHangMucTD?: number | null | undefined;
  qktThietKe?: number | null | undefined;
  qktThucTe?: number | null | undefined;
  viTriXT?: string | null | undefined;
  taiKhoan?: string | null | undefined;
  chuThich?: string | null | undefined;
}

export interface ConstructionSpecState {
  id?: number | null;
  idCT?: number | null;
  idHangMucCT?: number | null;
  caoTrinhCong?: string | null;
  cheDoKT?: string | null;
  caoTrinhDap?: string | null;
  cheDoXT?: string | null;
  chieuCaoDap?: number | null;
  chieuDaiCong?: number | null;
  chieuDaiDap?: number | null;
  duongKinhCong?: string | null;
  chieuRongDap?: number | null;
  nguongTran?: number | null;
  chieuSauDoanThuNuocDen?: number | null;
  chieuSauDoanThuNuocTu?: number | null;
  congSuatBom?: number | null;
  congSuatDamBao?: number | null;
  congSuatLM?: number | null;
  dienTichLuuVuc?: number | null;
  dienTichTuoiThietKe?: number | null;
  dienTichTuoiThucTe?: number | null;
  dungTichChet?: number | null;
  dungTichHuuIch?: number | null;
  dungTichToanBo?: number | null;
  hBeHut?: number | null;
  hDatOngLocDen?: number | null;
  hDatOngLocTu?: number | null;
  hDoanThuNuocDen?: number | null;
  hDoanThuNuocTu?: number | null;
  hDong?: number | null;
  hgieng?: number | null;
  hGiengKT?: number | null;
  hHaLuu?: number | null;
  hHaThap?: number | null;
  hlu?: number | null;
  hmax?: number | null;
  hmin?: number | null;
  hThuongLuu?: number | null;
  hTinh?: number | null;
  htoiThieu?: number | null;
  kichThuocCong?: string | null;
  kqKf?: number | null;
  luongNuocKT?: number | null;
  mnc?: number | null;
  mndbt?: number | null;
  mnlkt?: number | null;
  mnltk?: number | null;
  muaTrungBinhNam?: number | null;
  mucNuocDong?: number | null;
  mucNuocTinh?: number | null;
  phuongThucXT?: string | null;
  qBomLonNhat?: number | null;
  qBomThietKe?: number | null;
  qDamBao?: number | null;
  qKhaiThac?: number | null;
  qktCapNuocSinhHoat?: number | null;
  qktLonNhat?: number | null;
  qLonNhatTruocLu?: number | null;
  qMaxKT?: number | null;
  qmaxNM?: number | null;
  qMaxXaThai?: number | null;
  qThietKe?: number | null;
  qThucTe?: number | null;
  qTrungBinhNam?: number | null;
  qtt?: number | null;
  qXaThai?: number | null;
  qXaThaiLonNhat?: number | null;
  qXaThaiTB?: number | null;
  qXaTran?: number | null;
  soLuongMayBom?: number | null;
  thoiGianBomLonNhat?: string | null;
  thoiGianBomNhoNhat?: string | null;
  thoiGianBomTB?: string | null;
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
  duongKinhCong: null,
  chieuRongDap: null,
  nguongTran: null,
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