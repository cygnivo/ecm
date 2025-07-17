
const express = require('express');
const { getConnection } = require('../config/db');
const { authenticate, authorize } = require('../utils/auth');
const router = express.Router();

// ILM delete or archive request (via metadata flag)
router.post('/mark-ilm-delete', authenticate, authorize('admin'), async (req, res) => {
  const { orgId, contRepId, docName } = req.body;
  const table = \`DOCUMENTS_\${orgId}_\${contRepId}\`;
  try {
    await getConnection().execute(
      \`UPDATE \${table} SET ILM_DELETE_FLAG = 1 WHERE NAME = ?\`, [docName]
    );
    res.json({ status: 'Marked for ILM delete' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
