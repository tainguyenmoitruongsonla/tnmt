import React, { useState } from 'react'
import { Typography } from '@mui/material'
import DialogControlShowPDF from 'src/views/DialogControlShowPDF'

function GetFolderLicense ( type:any, TypeOfConstructionId:any, LicensingAuthorities:any) {

  const [link, setLink] = useState('');
  const [srcLicense, setSrc] = useState('');
  const [srcLicenseFee, setSrcLsFee] = useState('');
  if(type == 'license'){
    setSrc('/pdf/Licenses/');
    if(LicensingAuthorities == 0) {
      setLink('BTNMT/')
    }else{
      setLink('UNBD/')
    }
    switch (TypeOfConstructionId) {
      case 1: 

      return srcLicense+link+'/SurfaceWater/';
      case 8: 

      return srcLicense+link+'/GroundWater/';
      case 9: 

      return srcLicense+link+'/GroundWater/';
      case 10: 

      return srcLicense+link+'/GroundWater/';
      case 3: 
      
      return srcLicense+link+'/DischargeWater/';
      default: 
      
      return '';

  }
  }else if(type == 'licenseFee'){
    setSrcLsFee('/pdf/LicenseFees/')
    if(LicensingAuthorities == 0) {
      
      return srcLicenseFee+'BTNMT/';

    }else{

      return srcLicenseFee+'UNBD/';

    }
  }
}

const PDFFile = ({ type, src, TypeOfConsId, LicensingAuthorities }: any) => {
  const srcFolder:any = GetFolderLicense(type, TypeOfConsId, LicensingAuthorities)+src;
  
  return (
    <>
      <iframe style={{width: '100%', height: '100%'}} src={srcFolder}></iframe>
    </>
  )
}

const ShowFilePDF = ({ type, src, name, TypeOfConsId, LicensingAuthorities }:any) => {
  const Title = name;

  return (
    <DialogControlShowPDF>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
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
