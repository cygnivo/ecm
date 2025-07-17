
const { Storage } = require('@google-cloud/storage');
const { decrypt } = require('../utils/encryption');

function getBucket(config) {
  const key = JSON.parse(decrypt(config.GCS_PRIVATE_KEY));
  const storage = new Storage({ credentials: key });
  return storage.bucket(config.GCS_BUCKET);
}

module.exports = {
  save: async (config, docId, buffer) => {
    const bucket = getBucket(config);
    const file = bucket.file(docId);
    await file.save(buffer);
  },
  read: async (config, docId) => {
    const bucket = getBucket(config);
    const file = bucket.file(docId);
    const contents = await file.download();
    return contents[0];
  },
  delete: async (config, docId) => {
    const bucket = getBucket(config);
    await bucket.file(docId).delete({ ignoreNotFound: true });
  }
};
