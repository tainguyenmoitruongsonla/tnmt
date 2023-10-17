import { Dayjs } from "dayjs";

export interface LicenseFeeState {
    id?: number,
    idCon?: number,
    soQDTCQ?: string | null,
    ngayKy?: Dayjs | null,
    tongTienCQ?: number | undefined,
    filePDF?: string | null,
    ghiChu?: string | null,
    fileUpload?: File | null | undefined,
}

export const emptyLicenseFeeData = {
    id: 0,
    idCon: 0,
    soQDTCQ: '',
    ngayKy: null,
    tongTienCQ: 0,
    filePDF: null,
    ghiChu: null,
    fileUpload: null,
}