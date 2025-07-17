
const axios = require('axios');
const { decrypt } = require('../utils/encryption');

async function getAccessToken(config) {
  const resp = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', null, {
    params: {
      grant_type: 'refresh_token',
      refresh_token: decrypt(config.ONEDRIVE_REFRESH_TOKEN),
      client_id: config.ONEDRIVE_CLIENT_ID,
      client_secret: decrypt(config.ONEDRIVE_CLIENT_SECRET),
      scope: 'files.readwrite offline_access'
    }
  });
  return resp.data.access_token;
}

module.exports = {
  save: async (config, docId, buffer) => {
    const token = await getAccessToken(config);
    await axios.put(`https://graph.microsoft.com/v1.0/me/drive/items/${config.ONEDRIVE_DRIVE_ID}:/${docId}:/content`, buffer, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  read: async (config, docId) => {
    const token = await getAccessToken(config);
    const res = await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${config.ONEDRIVE_DRIVE_ID}:/${docId}:/content`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer'
    });
    return Buffer.from(res.data);
  },
  delete: async (config, docId) => {
    const token = await getAccessToken(config);
    await axios.delete(`https://graph.microsoft.com/v1.0/me/drive/items/${config.ONEDRIVE_DRIVE_ID}:/${docId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
