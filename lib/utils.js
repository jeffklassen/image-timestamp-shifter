var strftime = require('strftime');
var utils = {};

utils.addSeconds = function (seconds, dateTime) {
	return new Date(dateTime.getTime() + (1000 * seconds));
}

utils.convertToExifDate = function (dateObj) {
	return strftime("%Y:%m:%d %T", dateObj);
}

utils.parseExifDate = function (exifDateTime) {
	exifDateTime = exifDateTime.replace(/ /g, ":");
	var tsParts = exifDateTime.split(':');

	return new Date(tsParts[0], tsParts[1] - 1, tsParts[2], tsParts[3], tsParts[4], tsParts[5])
}

module.exports = utils;