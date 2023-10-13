import React from "react";

const DisplayOperatingStatus = ({ data }: any) => {
    let licenseStatusComponent;
    if (data.IsError) {
        licenseStatusComponent = <div className="license_status hsd-warning">Vận hành chưa đúng</div>;
      } else if (data.IsDisconnect)
          {
          licenseStatusComponent = <div className="license_status hsd-danger">Không có số liệu</div>;
        } 
    else {
      licenseStatusComponent = <div className="license_status hsd-success">Đang vận hành</div>;
    }
    
    return <>{licenseStatusComponent}</>;
};

export default DisplayOperatingStatus;