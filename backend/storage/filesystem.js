
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const getHashedPath = (docId) => {
  const hash = crypto.createHash('sha1').update(docId).digest('hex');
  return path.join(__dirname, '../../storage', hash.substring(0, 2), hash);
};

module.exports = {
  save: (docId, buffer) => {
    const dirPath = getHashedPath(docId);
    fs.mkdirSync(path.dirname(dirPath), { recursive: true });
    fs.writeFileSync(dirPath, buffer);
  },
  read: (docId) => {
    const filePath = getHashedPath(docId);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath) : null;
  },
  delete: (docId) => {
    const filePath = getHashedPath(docId);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};
