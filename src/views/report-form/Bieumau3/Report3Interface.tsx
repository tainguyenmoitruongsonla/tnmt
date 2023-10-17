
export interface Report3State {
    id: number
    tenTram: string
    thoiKyQuanTrac: string
    luongMuaThang1: number
    luongMuaThang2: number
    luongMuaThang3: number
    luongMuaThang4: number
    luongMuaThang5: number
    luongMuaThang6: number
    luongMuaThang7: number
    luongMuaThang8: number
    luongMuaThang9: number
    luongMuaThang10: number
    luongMuaThang11: number
    luongMuaThang12: number
    luongMuaNam: number
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
    onChange: (data: Report3State, fileUpload?: any) => void;
}