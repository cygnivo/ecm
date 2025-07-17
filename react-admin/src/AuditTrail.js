
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditTrail = ({ token }) => {
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    const res = await axios.get('/admin/audit-trail', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLogs(res.data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div>
      <h2>Audit Trail</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>
            [{log.TIMESTAMP}] {log.USERNAME} performed {log.ACTION} on {log.DOC_NAME} ({log.ORGID}/{log.CONTREP_ID}) – {log.DETAILS}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditTrail;
