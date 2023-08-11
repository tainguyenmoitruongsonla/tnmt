const CheckEffect = ({ data }: any) => {
  const getLicenseStatus = (dateAcquired: any) => {
    const date1 = new Date();
    const date2 = new Date(dateAcquired);
    if (dateAcquired != null || dateAcquired != undefined || dateAcquired != '') {
      const licenseStatus = Math.floor((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));

      return licenseStatus;
    }

    return null;
  };

  if (data) {
    let licenseStatusComponent;
    if (data.ExpireDate == null || data.LicenseTypeName === "Thu hồi") {
      licenseStatusComponent = <div className="license_status hsd-revoked">Giấy phép thu hồi</div>;
    } else {
      let reverseDate = '';
      if (data.ExpireDate.includes('/')) {
        reverseDate = data.ExpireDate.split('/').reverse().join('-');
      } else {
        reverseDate = data.ExpireDate;
      }
      const endDate = new Date(reverseDate);
      const licenseStatus = getLicenseStatus(endDate);
      if (licenseStatus != null) {
        if (data.IsRevoked === false) {
          if (data?.LicensingTypeId === 5) {
            licenseStatusComponent = <div className="license_status hsd-success">Còn hiệu lực</div>;
          } else {
            if (licenseStatus > 0) {
              licenseStatusComponent = <div className="license_status hsd-danger">Hết hiệu lực</div>;
            } else if (licenseStatus <= 0) {
              if (licenseStatus > -180) {
                licenseStatusComponent = <div className="license_status hsd-warning">Sắp hết hiệu lực</div>;
              } else if (licenseStatus < -180) {
                licenseStatusComponent = <div className="license_status hsd-success">Còn hiệu lực</div>;
              }
            }
          }
        } else {
          licenseStatusComponent = <div className="license_status hsd-danger">Đã bị thu hồi</div>;
        }
      }
    }
    
    return <>{licenseStatusComponent}</>;
  }

  return null;
};

export default CheckEffect;
