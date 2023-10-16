const CheckEffect = ({ data }: any) => {

  if (data) {
    let licenseStatusComponent;
    if (data.idLoaiGP === 5) {
      licenseStatusComponent = <div className="license_status hsd-revoked">Giấy phép thu hồi</div>;
    } else {
      if (data.hieuluc_gp !== null) {
        if (data.hieuluc_gp === 'het-hieu-luc') {
          licenseStatusComponent = <div className="license_status hsd-danger">Hết hiệu lực</div>;
        }
        if (data.hieuluc_gp === 'sap-het-hieu-luc') {
          licenseStatusComponent = <div className="license_status hsd-warning">Sắp hết hiệu lực</div>;
        }
        if (data.hieuluc_gp === 'con-hieu-luc') {
          licenseStatusComponent = <div className="license_status hsd-success">Còn hiệu lực</div>;
        }
        if (data.hieuluc_gp === "da-bi-thu-hoi") {
          licenseStatusComponent = <div className="license_status hsd-danger">Đã bị thu hồi</div>;
        }
      }
    }

    return <>{licenseStatusComponent}</>;
  }

  return null;
};

export default CheckEffect;
