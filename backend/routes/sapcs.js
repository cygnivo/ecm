
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'SAP /sapcs interface working' });
});

module.exports = router;
