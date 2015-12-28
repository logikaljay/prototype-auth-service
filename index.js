// extend String with strings
String.format = require('util').format
String.denied = "Access denied"
String.ok = "Token removed"

module.exports = require('./src')