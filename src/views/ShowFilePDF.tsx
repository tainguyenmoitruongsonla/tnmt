import React, { useState } from 'react'
import { Typography } from '@mui/material'
import DialogControlShowPDF from 'src/views/DialogControlShowPDF'

const PDFFile = ({ src }: any) => {
  return (
    <>
      <iframe style={{width: '100%', height: '100%'}} src={'/pdf/Licenses/SurfaceWater/'+src}></iframe>
    </>
  )
}

const ShowFilePDF = ({ src, name }:any) => {
  const Title = name;

  return (
    <DialogControlShowPDF>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          <Typography className='btnShowFilePdf' onClick={() =>
                openDialogs(<PDFFile src={src} />, Title)
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
