module.exports = items => items.every(Array.isArray) ? flatten([].concat(...items)) : items;
