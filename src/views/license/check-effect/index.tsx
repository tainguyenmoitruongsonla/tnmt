const CheckEffect = ({ data }: any) => {

  if (data) {
    let licenseStatusComponent;
    if (data.licensingTypeSlug === 'thu-hoi') {
      licenseStatusComponent = <div className="license_status hsd-revoked">Giấy phép thu hồi</div>;
    } else {
      if (data.licenseValidity !== null) {
        if (data.licenseValidity === 'het-hieu-luc') {
          licenseStatusComponent = <div className="license_status hsd-danger">Hết hiệu lực</div>;
        }
        if (data.licenseValidity === 'sap-het-hieu-luc') {
          licenseStatusComponent = <div className="license_status hsd-warning">Sắp hết hiệu lực</div>;
        }
        if (data.licenseValidity === 'con-hieu-luc') {
          licenseStatusComponent = <div className="license_status hsd-success">Còn hiệu lực</div>;
        }
        if (data.licenseValidity === "da-bi-thu-hoi") {
          licenseStatusComponent = <div className="license_status hsd-danger">Đã bị thu hồi</div>;
        }
      }
    }

    return <>{licenseStatusComponent}</>;
  }

  return null;
};

export default CheckEffect;
