
const { google } = require('googleapis');
const { decrypt } = require('../utils/encryption');

async function getDrive(config) {
  const oauth2Client = new google.auth.OAuth2(
    config.GDRIVE_CLIENT_ID,
    decrypt(config.GDRIVE_CLIENT_SECRET),
    "urn:ietf:wg:oauth:2.0:oob"
  );
  oauth2Client.setCredentials({
    refresh_token: decrypt(config.GDRIVE_REFRESH_TOKEN),
  });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  return drive;
}

module.exports = {
  save: async (config, docId, buffer) => {
    const drive = await getDrive(config);
    await drive.files.create({
      requestBody: {
        name: docId,
        parents: [config.GDRIVE_FOLDER_ID],
      },
      media: { body: Buffer.from(buffer) },
    });
  },
  read: async (config, docId) => {
    const drive = await getDrive(config);
    const res = await drive.files.get({ fileId: docId, alt: 'media' }, { responseType: 'arraybuffer' });
    return Buffer.from(res.data);
  },
  delete: async (config, docId) => {
    const drive = await getDrive(config);
    await drive.files.delete({ fileId: docId });
  }
};
