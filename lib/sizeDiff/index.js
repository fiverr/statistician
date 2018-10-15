const byteSize = require('byte-size');

module.exports = diff => `${diff > 0 ? '-' : diff < 0 ? '+' : ''}${byteSize(Math.abs(diff))}`;
