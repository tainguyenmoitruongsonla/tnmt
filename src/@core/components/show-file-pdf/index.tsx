import React, { useState, useEffect } from 'react';
import apiUrl from 'src/api/config';
import { pdfjs, Document, Page } from 'react-pdf';
import { Typography } from '@mui/material';
import DialogControlShowPDF from '../dialog-control-show-pdf';

interface ShowFilePDFProps {
    src: string
    name: string
    fileName: string
}

const ShowFilePDF = ({ src, name, fileName }: ShowFilePDFProps) => {
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [numPages, setNumPages] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        handleReadFile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReadFile = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/readfile?FilePath=${src}&FileName=${fileName}`);

            if (!response.ok) {
                throw new Error('File not found');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setFileUrl(url);

            // Get the total number of pages
            const pdf = await pdfjs.getDocument(url).promise;
            setNumPages(pdf.numPages);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false)
        }
    };

    // Generate an array of <Page> components for all pages
    const renderPages = () => {
        const pages = [];
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            pages.push(
                <Page
                    key={pageNumber}
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            );
        }

        return pages;
    };

    const openPdfDialog = async (openDialogs: any) => {
        openDialogs(fileUrl ? (
            <Document file={fileUrl} loading={loading}>
                {renderPages()}
            </Document>
        ) : <>KHÔNG CÓ FILE HIỂN THỊ</>, name);
    };

    return (
        <div>
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
        </div>
    );
};

export default ShowFilePDF;
