import React from 'react'
import { Typography } from '@mui/material'
import DialogControlShowPDF from '../dialog-control-show-pdf';


const PDFFile = ({ src }: any) => {

  return (
    <>
      <object style={{ width: '100%', height: '100%' }} data={src}></object>
    </>
  )
}

const ShowFilePDF = ({ src, name }: any) => {

  return (
    <>
      <DialogControlShowPDF>
        {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
          <>
            <Typography
              className='btnShowFilePdf'
              onClick={() =>
                openDialogs(<PDFFile src={src} />, name)
              }
            >
              {name}
            </Typography>
          </>
        )}
      </DialogControlShowPDF>
    </>
  );
};

export default ShowFilePDF
