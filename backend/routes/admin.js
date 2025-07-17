
const express = require('express');
const router = express.Router();
const { getConnection } = require('../config/db');

router.get('/list', async (req, res) => {
  const contRep = req.query.contRep;
  const [rows] = await getConnection().execute('SELECT * FROM CONTREP WHERE CONTREP_ID = ?', [contRep]);
  return res.json(rows);
});

router.get('/search', async (req, res) => {
  const { orgId, contRepId, name } = req.query;
  const docsTable = `DOCUMENTS_${orgId}_${contRepId}`;
  const [rows] = await getConnection().execute(
    `SELECT NAME, DATEM, TIMEM FROM ${docsTable} WHERE NAME LIKE ? ORDER BY DATEM DESC`,
    [`%${name || ''}%`]
  );
  return res.json(rows);
});

module.exports = router;
