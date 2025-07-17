
const { BlobServiceClient } = require('@azure/storage-blob');
const { decrypt } = require('../utils/encryption');

function getContainerClient(config) {
  const connStr = `DefaultEndpointsProtocol=https;AccountName=${config.AZURE_ACCOUNT_NAME};AccountKey=${decrypt(config.AZURE_ACCOUNT_KEY)};EndpointSuffix=core.windows.net`;
  const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
  return blobServiceClient.getContainerClient(config.AZURE_CONTAINER);
}

module.exports = {
  save: async (config, docId, buffer) => {
    const containerClient = getContainerClient(config);
    const blockBlobClient = containerClient.getBlockBlobClient(docId);
    await blockBlobClient.uploadData(buffer);
  },
  read: async (config, docId) => {
    const containerClient = getContainerClient(config);
    const blockBlobClient = containerClient.getBlockBlobClient(docId);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    return await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
  },
  delete: async (config, docId) => {
    const containerClient = getContainerClient(config);
    const blockBlobClient = containerClient.getBlockBlobClient(docId);
    await blockBlobClient.deleteIfExists();
  }
};

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => chunks.push(data instanceof Buffer ? data : Buffer.from(data)));
    readableStream.on("end", () => resolve(Buffer.concat(chunks)));
    readableStream.on("error", reject);
  });
}
