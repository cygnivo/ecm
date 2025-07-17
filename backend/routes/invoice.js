
const express = require('express');
const { getConnection } = require('../config/db');
const { authenticate } = require('../utils/auth');
const router = express.Router();

// Update invoice metadata
router.post('/tag', authenticate, async (req, res) => {
  const { orgId, contRepId, docName, supplier, total, taxId, dueDate } = req.body;
  const table = \`DOCUMENTS_\${orgId}_\${contRepId}\`;
  try {
    await getConnection().execute(
      \`UPDATE \${table}
       SET SUPPLIER_NAME=?, INVOICE_TOTAL=?, TAX_ID=?, DUE_DATE=? WHERE NAME=?\`,
      [supplier, total, taxId, dueDate, docName]
    );
    res.json({ status: 'Invoice metadata updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
