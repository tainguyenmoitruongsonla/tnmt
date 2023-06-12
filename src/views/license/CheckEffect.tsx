import { useState } from "react";

const CheckEffect = ({ data }:any) => {
  function getLicenseStatus(dateAcquired: any) {
    const date1 = new Date();
    const date2 = new Date(dateAcquired);
    if (dateAcquired != null || dateAcquired != undefined || dateAcquired != '') {
        const licenseStatus = Math.floor((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));

        return licenseStatus;
    }
  }

  function CheckEffect(data:any){
    const [reverseDate, setReverseDate] = useState('');
    if(data){
        if (data.ExpireDate == null || data.LicenseTypeName == "Thu hồi") {
            return <div className="license_status hsd-revoked"> Giấy phép thu hồi </div>;
        }
        if (data.ExpireDate.includes('/')) {
            setReverseDate(data.ExpireDate.split('/').reverse().join('-'))
        } else {
            setReverseDate(data.ExpireDate)
        }
        const endDate = new Date(reverseDate);
        const LicenseStatus = getLicenseStatus(endDate);
        if(LicenseStatus != undefined){
            if (data.IsRevoked == false) {
                if (data.License_Fk.LicensingTypeId == 5) {

                    return <div className="license_status hsd-success"> Còn hiệu lực </div>;
                } else {
                    if (LicenseStatus > 0) {

                        return <div className="license_status hsd-danger"> Hết hiệu lực </div>;
                    }
                    else if (LicenseStatus <= 0) {
                        if (LicenseStatus > - 180) {

                        return <div className="license_status hsd-warning"> Sắp hết hiệu lực </div>;
                        } else if (LicenseStatus < - 180) {

                        return <div className="license_status hsd-success"> Còn hiệu lực </div>;
                    }
                }
            }
            } else {
                
                return <div className="license_status hsd-danger"> Đã bị thu hồi </div>;
            }
        }
    }
        
}

  return (
    <>{CheckEffect(data)}</>
  );

};

export default CheckEffect;
