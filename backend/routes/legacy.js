
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Handled legacy ContentServer.dll POST request');
});

module.exports = router;
