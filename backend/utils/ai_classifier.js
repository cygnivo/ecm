
// Placeholder for future ML integration
function classifyDocument(filename, buffer) {
  if (filename.toLowerCase().includes('invoice')) return 'INVOICE';
  if (filename.toLowerCase().includes('contract')) return 'CONTRACT';
  return 'UNCLASSIFIED';
}

module.exports = { classifyDocument };
