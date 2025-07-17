
const { getConnection } = require('../config/db');

async function logAudit(orgId, contRepId, docName, action, username, details) {
  await getConnection().execute(
    'INSERT INTO AUDIT_TRAIL (ORGID, CONTREP_ID, DOC_NAME, ACTION, USERNAME, DETAILS) VALUES (?, ?, ?, ?, ?, ?)',
    [orgId, contRepId, docName, action, username, details]
  );
}

module.exports = { logAudit };
