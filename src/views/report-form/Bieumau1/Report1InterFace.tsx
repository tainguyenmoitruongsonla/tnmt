
export interface Report1State {
    id: number
    luuVucSong: string
    tongTramQuanTracKyTruoc: number
    tongTramQuanTracBaoCao: number
    tramKhiTuongKyTruoc: number
    tramKhiTuongBaoCao: number
    tramThuyVanKyTruoc: number
    tramThuyVanKyBaoCao: number
    tramTNNKyTruoc: number
    tramTNNKyBaoCao: number
    tramQuanTracKyTruoc: number
    tramQuanTracKyBaoCao: number
    ghiChu: string
}

export const emptyReport3Data = {
    id: 0,
    tenTram: null,
    thoiKyQuanTrac: null,
    luongMuaThang1: null,
    luongMuaThang2: null,
    luongMuaThang3: null,
    luongMuaThang4: null,
    luongMuaThang5: null,
    luongMuaThang6: null,
    luongMuaThang7: null,
    luongMuaThang8: null,
    luongMuaThang9: null,
    luongMuaThang10: null,
    luongMuaThang11: null,
    luongMuaThang12: null,
    luongMuaNam: null,
    ghiChu: null,
}

export interface FormLicenseProps {
    data: any;
    closeDialogs: () => void;
    setPostSuccess?: (value: boolean) => void;
}

export interface LicenseFieldsetProps {
    data?: any;
    onChange: (data: Report1State, fileUpload?: any) => void;
}