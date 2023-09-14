import { Dayjs } from "dayjs";

export interface LicenseFeeState {
    id?: number,
    childrenId?: number,
    licenseFeeNumber?: string | null,
    signDate?: Dayjs | null,
    totalMoney?: number | undefined,
    filePDF?: string | null,
    description?: string | null,
    fileUpload?: File | null | undefined,
}

export const emptyLicenseFeeData = {
    id: 0,
    childrenId: 0,
    licenseFeeNumber: '',
    signDate: null,
    totalMoney: 0,
    filePDF: null,
    description: null,
    fileUpload: null,
}