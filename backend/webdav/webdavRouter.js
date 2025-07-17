
const express = require('express');
const { v2: webdav } = require('webdav-server');
const router = express.Router();

/**
 * WebDAV Server Middleware
 */
const server = new webdav.WebDAVServer({
  port: 1900,
  autoLoad: {
    fsManager: {
      '*': new webdav.PhysicalFileSystem('./data')
    }
  }
});

server.afterRequest((arg, next) => {
  console.log(\`[WebDAV] \${arg.request.method} \${arg.requested.path}\`);
  next();
});

// Mount WebDAV server
router.use('/', (req, res, next) => {
  server.executeRequest(req, res);
});

module.exports = router;
