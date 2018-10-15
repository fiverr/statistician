/**
 * Create a badge tag with text and colour
 * @param  {String} string
 * @param  {String} color
 * @return {String}
 */
module.exports = (string, color) => `![${string}](https://img.shields.io/badge/-${encodeURIComponent(string)}-${color}.svg?style=flat-square)`;
