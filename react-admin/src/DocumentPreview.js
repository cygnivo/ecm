
import React, { useState } from 'react';

const DocumentPreview = ({ docUrl }) => {
  if (!docUrl) return <p>No document selected.</p>;

  if (docUrl.endsWith('.pdf')) {
    return (
      <iframe src={docUrl} width="100%" height="600px" title="PDF Preview" />
    );
  } else if (docUrl.match(/\.(jpg|jpeg|png|gif)$/)) {
    return <img src={docUrl} alt="Preview" style={{ maxWidth: '100%' }} />;
  }

  return <a href={docUrl} target="_blank" rel="noopener noreferrer">Download File</a>;
};

export default DocumentPreview;
