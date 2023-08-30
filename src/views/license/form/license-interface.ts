import { Dayjs } from "dayjs";

export interface LicenseState {
    id: number;
    childId: number;
    licensingTypeId: number;
    businessId: number;
    licenseName: string | null;
    licenseNumber: string | null;
    signDate: Dayjs | null;
    issueDate: Dayjs | null;
    expriteDate: Dayjs | null;
    duration: string | null;
    licensingAuthorities: string | null;
    relatedDocumentFile: string | null;
    licenseRequestFile: string | null;
}

export const emptyLicenseData = {
    id: 0,
    childId: 0,
    licensingTypeId: 0,
    businessId: 0,
    licenseName: null,
    licenseNumber: null,
    signDate: null,
    issueDate: null,
    expriteDate: null,
    duration: null,
    licensingAuthorities: null,
    relatedDocumentFile: null,
    licenseRequestFile: null,
}

export interface FormLicenseProps {
    data: any;
    closeDialogs: () => void;
    setPostSuccess?: (value: boolean) => void;
}

export interface LicenseFieldsetProps {
    data?: any;
    onChange: (data: LicenseState) => void;
}