
const AWS = require('aws-sdk');
const { decrypt } = require('../utils/encryption');

function getS3(config) {
  return new AWS.S3({
    accessKeyId: config.S3_KEY,
    secretAccessKey: decrypt(config.S3_SECRET),
    region: config.S3_REGION,
  });
}

module.exports = {
  save: async (config, docId, buffer) => {
    const s3 = getS3(config);
    await s3.putObject({
      Bucket: config.STORAGE_LOCATION,
      Key: docId,
      Body: buffer,
    }).promise();
  },
  read: async (config, docId) => {
    const s3 = getS3(config);
    const result = await s3.getObject({
      Bucket: config.STORAGE_LOCATION,
      Key: docId,
    }).promise();
    return result.Body;
  },
  delete: async (config, docId) => {
    const s3 = getS3(config);
    await s3.deleteObject({
      Bucket: config.STORAGE_LOCATION,
      Key: docId,
    }).promise();
  }
};
