
const express = require('express');
const { getConnection } = require('../config/db');
const router = express.Router();

router.post('/simulate-expiry-cleanup', async (req, res) => {
  const { orgId, contRepId } = req.body;
  const docsTable = `DOCUMENTS_${orgId}_${contRepId}`;
  const compsTable = `COMPONENTS_${orgId}_${contRepId}`;

  try {
    const [expired] = await getConnection().execute(
      `SELECT NAME FROM ${docsTable} 
       WHERE LEGAL_HOLD = FALSE 
       AND DATE_ADD(DATEM, INTERVAL RETENTION_YEARS YEAR) < NOW()`
    );
    for (let row of expired) {
      await getConnection().execute(`DELETE FROM ${docsTable} WHERE NAME = ?`, [row.NAME]);
      await getConnection().execute(`DELETE FROM ${compsTable} WHERE NAME = ?`, [row.NAME]);
    }
    res.json({ deleted: expired.map(d => d.NAME) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
