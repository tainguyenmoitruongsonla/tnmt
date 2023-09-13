import React, { useState, useEffect } from 'react';
import apiUrl from 'src/api/config';
import { pdfjs, Document, Page } from 'react-pdf';

const FileDisplay = () => {
    const fileName = '123.pdf'; // Replace with the desired file name
    const filePath = '123';
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [numPages, setNumPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Set the worker source URL
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        // Load the PDF file when the component mounts
        handleReadFile();
    }, []);

    const handleReadFile = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/readfile?FilePath=${filePath}&FileName=${fileName}`);

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

    return (
        <div>
            {fileUrl ? (
                <Document file={fileUrl} loading={loading}>
                    {renderPages()}
                </Document>
            ) : <>Không có file PDF</>}
        </div>
    );
};

export default FileDisplay;
