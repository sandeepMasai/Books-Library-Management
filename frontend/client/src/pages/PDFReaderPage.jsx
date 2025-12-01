import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const PDFReaderPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [pdfUrl, setPdfUrl] = useState('');
  const [bookTitle, setBookTitle] = useState('');

  useEffect(() => {
    // Get PDF URL and book title from location state or fetch from API
    if (location.state?.pdfFile && location.state?.title) {
      setPdfUrl(location.state.pdfFile);
      setBookTitle(location.state.title);
    } else if (location.state?.pdfFile) {
      setPdfUrl(location.state.pdfFile);
    }
  }, [location.state]);

  if (!pdfUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No PDF available</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          {bookTitle && (
            <h1 className="text-lg font-semibold truncate max-w-md">{bookTitle}</h1>
          )}
        </div>
        <a
          href={pdfUrl}
          download
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download</span>
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="w-full h-[calc(100vh-64px)]">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full border-0"
          title="PDF Reader"
        />
      </div>
    </div>
  );
};

export default PDFReaderPage;

