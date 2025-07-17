const express = require('express');
const router = express.Router();

/**
 * CMIS AtomPub Endpoint
 * Example: GET /cmis/repositories
 */
router.get('/repositories', (req, res) => {
  res.set('Content-Type', 'application/atomsvc+xml');
  return res.send(`<?xml version="1.0" encoding="UTF-8"?>
<service xmlns="http://www.w3.org/2007/app"
         xmlns:cmis="http://docs.oasis-open.org/ns/cmis/core/200908/"
         xmlns:atom="http://www.w3.org/2005/Atom">
  <workspace>
    <atom:title>Default</atom:title>
    <cmis:repositoryInfo>
      <cmis:repositoryId>repo1</cmis:repositoryId>
      <cmis:repositoryName>CMIS Default Repo</cmis:repositoryName>
      <cmis:cmisVersionSupported>1.1</cmis:cmisVersionSupported>
    </cmis:repositoryInfo>
  </workspace>
</service>`);
});

module.exports = router;
