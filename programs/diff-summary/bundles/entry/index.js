const byteSize = require('byte-size');

module.exports = ({size, percent}) => size === 0 ? '0' : `${byteSize(size)} (${percent}%)`;
