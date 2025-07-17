
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.json({ message: 'Repository list placeholder' });
});

module.exports = router;
