const characters = [
	'<',
];
const pattern = new RegExp(`[${characters.join('|')}]`, 'gm');

module.exports = string => string.replace(pattern, match => `\\${match}`);
