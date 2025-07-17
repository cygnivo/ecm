
const express = require('express');
const { getConnection } = require('../config/db');
const { authenticate, authorize } = require('../utils/auth');
const router = express.Router();

// Create retention rule
router.post('/create', authenticate, authorize('admin'), async (req, res) => {
  const { orgId, contRepId, docType, years, deleteAfter } = req.body;
  try {
    await getConnection().execute(
      `INSERT INTO RETENTION_RULES (ORGID, CONTREP_ID, DOC_TYPE, RETENTION_YEARS, DELETE_AFTER_RETENTION)
       VALUES (?, ?, ?, ?, ?)`,
      [orgId, contRepId, docType, years || 7, deleteAfter || false]
    );
    res.json({ status: 'Rule created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List rules
router.get('/list', authenticate, async (req, res) => {
  const [rows] = await getConnection().execute('SELECT * FROM RETENTION_RULES WHERE ACTIVE = TRUE');
  res.json(rows);
});

module.exports = router;
