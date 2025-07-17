
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetadataSchema = ({ token }) => {
  const [schema, setSchema] = useState([]);
  const [newField, setNewField] = useState({ field: '', type: 'string', required: false });

  const loadSchema = async () => {
    const orgId = prompt("Enter ORGID");
    const contRepId = prompt("Enter CONTREP_ID");
    const res = await axios.get('/admin/metadata-schema', {
      headers: { Authorization: `Bearer ${token}` },
      params: { orgId, contRepId }
    });
    setSchema(res.data);
  };

  const addField = async () => {
    const orgId = prompt("ORGID?");
    const contRepId = prompt("CONTREP_ID?");
    await axios.post('/admin/metadata-schema', {
      orgId, contRepId, ...newField
    }, { headers: { Authorization: `Bearer ${token}` } });
    alert("Field added");
    loadSchema();
  };

  return (
    <div>
      <h2>Metadata Schema</h2>
      <button onClick={loadSchema}>Load</button>
      <input placeholder="Field" onChange={e => setNewField({ ...newField, field: e.target.value })} />
      <select onChange={e => setNewField({ ...newField, type: e.target.value })}>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
      </select>
      <label>
        <input type="checkbox" onChange={e => setNewField({ ...newField, required: e.target.checked })} />
        Required
      </label>
      <button onClick={addField}>Add Field</button>

      <ul>
        {schema.map((f, i) => (
          <li key={i}>{f.FIELD_NAME} ({f.FIELD_TYPE}) {f.REQUIRED ? '[required]' : ''}</li>
        ))}
      </ul>
    </div>
  );
};

export default MetadataSchema;
