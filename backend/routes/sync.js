
const express = require('express');
const multer = require('multer');
const { getConnection } = require('../config/db');
const router = express.Router();
const upload = multer();

router.post('/batch-upload', upload.single('file'), async (req, res) => {
  const { orgId, contRepId, docName, shortValue } = req.body;
  const buffer = req.file?.buffer;
  const docsTable = \`DOCUMENTS_\${orgId}_\${contRepId}\`;
  const compsTable = \`COMPONENTS_\${orgId}_\${contRepId}\`;

  try {
    await getConnection().execute(
      \`INSERT INTO \${docsTable} (NAME, SHORT_VALUE, DATEM, TIMEM) VALUES (?, ?, CURDATE(), CURTIME())\`,
      [docName, shortValue]
    );
    await getConnection().execute(
      \`INSERT INTO \${compsTable} (NAME, LVALUE, LONG_VALUE, COMPDATEM, COMPTIMEM)
       VALUES (?, ?, ?, CURDATE(), CURTIME())\`,
      [docName, buffer?.length || 0, buffer]
    );
    res.json({ status: 'Document uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
