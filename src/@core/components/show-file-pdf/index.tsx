import React from 'react';
import { Typography } from '@mui/material';
import DialogControlShowPDF from '../dialog-control-show-pdf';
import apiUrl from 'src/api/config';

const PDFFile = ({ src }: { src: string }) => {
  return (
    <object style={{ width: '100%', height: '500px' }} type="application/pdf" data={src}></object>
  );
};

const ShowFilePDF = ({ src, name }: { src: string, name: string }) => {
  const openPdfDialog = async (openDialogs: any) => {
    const pdfUrl = await fetchAndDisplayPDF(src, name);

    if (pdfUrl) {
      const pdfContent = <PDFFile src={pdfUrl} />;
      openDialogs(pdfContent, name);
    }
  };

  const fetchAndDisplayPDF = async (filePath: string, fileName: string) => {
    const url = `${apiUrl}/getfile?filePath=${filePath}&fileName=${fileName.toLowerCase()}.pdf`;

    try {
      const response = await fetch(url);

      console.log(await response.json())

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);

      return pdfUrl;
    } catch (error) {
      console.error('Error fetching or displaying PDF:', error);

      return null;
    }
  };

  return (
    <DialogControlShowPDF>
      {(openDialogs: any) => (
        <Typography
          className='btnShowFilePdf'
          onClick={() => openPdfDialog(openDialogs)}
        >
          {name}
        </Typography>
      )}
    </DialogControlShowPDF>
  );
};

export default ShowFilePDF;
