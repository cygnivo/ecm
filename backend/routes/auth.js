
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [users] = await getConnection().execute(
    'SELECT * FROM USERS WHERE USERNAME = ? AND ACTIVE = TRUE', [username]
  );
  const user = users[0];
  if (!user || !(await bcrypt.compare(password, user.PASSWORD_HASH))) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.ID, role: user.ROLE, org: user.ORGID }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;
