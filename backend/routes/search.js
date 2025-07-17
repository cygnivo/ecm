
const express = require('express');
const { getConnection } = require('../config/db');
const { authenticate } = require('../utils/auth');
const router = express.Router();

// Simple full-text search
router.get('/search', authenticate, async (req, res) => {
  const { orgId, contRepId, query } = req.query;
  const table = \`DOCUMENTS_\${orgId}_\${contRepId}\`;
  try {
    const [rows] = await getConnection().execute(
      \`SELECT NAME, SHORT_PROPERTY, SHORT_VALUE FROM \${table}
       WHERE SHORT_PROPERTY LIKE ? OR SHORT_VALUE LIKE ?\`,
      [\`%\${query}%\`, \`%\${query}%\`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
