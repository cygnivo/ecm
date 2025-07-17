
const express = require('express');
const { getConnection } = require('../config/db');
const { authenticate } = require('../utils/auth');
const router = express.Router();

// Update workflow status
router.post('/update-status', authenticate, async (req, res) => {
  const { orgId, contRepId, docName, status, assignedTo, comment } = req.body;
  const table = `DOCUMENTS_${orgId}_${contRepId}`;
  try {
    await getConnection().execute(
      \`UPDATE \${table} SET STATUS=?, ASSIGNED_TO=?, WORKFLOW_COMMENTS=? WHERE NAME=?\`,
      [status, assignedTo, comment, docName]
    );
    res.json({ status: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
