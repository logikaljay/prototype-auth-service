// extend String with strings
String.format = require('util').format
String.denied = "Access denied"
String.ok = "Access approved"
String.removed = "Token removed"

module.exports = require('./src')