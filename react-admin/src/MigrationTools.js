
import React, { useState } from 'react';
import axios from 'axios';

const MigrationTools = ({ token }) => {
  const [orgId, setOrgId] = useState('');
  const [contRepId, setContRepId] = useState('');
  const [docName, setDocName] = useState('');
  const [shortValue, setShortValue] = useState('');
  const [file, setFile] = useState(null);
  const [migratedCount, setMigratedCount] = useState(null);

  const migrateFromStaging = async () => {
    const res = await axios.post('/migration/migrate-staging', { orgId, contRepId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMigratedCount(res.data.migrated);
  };

  const uploadSync = async () => {
    const formData = new FormData();
    formData.append('orgId', orgId);
    formData.append('contRepId', contRepId);
    formData.append('docName', docName);
    formData.append('shortValue', shortValue);
    formData.append('file', file);
    await axios.post('/sync/batch-upload', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('File uploaded');
  };

  return (
    <div>
      <h2>Migration Tools</h2>
      <div>
        <h4>Migrate From Staging</h4>
        <input placeholder="ORGID" value={orgId} onChange={e => setOrgId(e.target.value)} />
        <input placeholder="CONTREP_ID" value={contRepId} onChange={e => setContRepId(e.target.value)} />
        <button onClick={migrateFromStaging}>Migrate</button>
        {migratedCount !== null && <p>Migrated: {migratedCount}</p>}
      </div>
      <div>
        <h4>Direct Upload</h4>
        <input placeholder="Document Name" value={docName} onChange={e => setDocName(e.target.value)} />
        <input placeholder="Short Value" value={shortValue} onChange={e => setShortValue(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={uploadSync}>Upload File</button>
      </div>
    </div>
  );
};

export default MigrationTools;
