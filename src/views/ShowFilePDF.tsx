import React, { useState } from 'react'
import { Typography } from '@mui/material'
import DialogControlShowPDF from 'src/views/DialogControlShowPDF'

function GetFolderLicense ( type:any, TypeOfConstructionId:any, LicensingAuthorities:any) {
  if(type == 'license'){
    var src:any = '/pdf/Licenses/';
    if(LicensingAuthorities == 0) {
      var link = 'BTNMT/';
    }else{
    var link = 'UNBD/';
    }
    switch (TypeOfConstructionId) {
      case 1: return src+link+'/SurfaceWater/';
      case 8: return src+link+'/GroundWater/';
      case 9: return src+link+'/GroundWater/';
      case 10: return src+link+'/GroundWater/';
      case 3: return src+link+'/DischargeWater/';
      default: return '';
  }
  }else if(type == 'licenseFee'){
    var src:any = '/pdf/LicenseFees/';
    if(LicensingAuthorities == 0) {
      return src+'BTNMT/';
    }else{
      return src+'UNBD/';
    }
  }
}

const PDFFile = ({ type, src, TypeOfConsId, LicensingAuthorities }: any) => {
  var src:any = GetFolderLicense(type, TypeOfConsId, LicensingAuthorities)+src;
  return (
    <>
      <iframe style={{width: '100%', height: '100%'}} src={src}></iframe>
    </>
  )
}

const ShowFilePDF = ({ type, src, name, TypeOfConsId, LicensingAuthorities }:any) => {
  const Title = name;

  return (
    <DialogControlShowPDF>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          <Typography className='btnShowFilePdf' onClick={() =>
                openDialogs(<PDFFile type={type} src={src} TypeOfConsId={TypeOfConsId} LicensingAuthorities={LicensingAuthorities} />, Title)
              }
            >
              {Title}
            </Typography>
        </>
      )}
    </DialogControlShowPDF>
  )
}

export default ShowFilePDF
