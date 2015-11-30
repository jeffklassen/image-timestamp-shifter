var enumerate = require('./enumerate');
var piexif = require("piexifjs");
var fs = require("fs");
var strftime = require('strftime');

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var addSeconds = function (seconds, dateTime) {
	return new Date(dateTime.getTime() + (1000 * seconds));
}

var convertToExifDate = function (dateObj) {
	return strftime("%Y:%m:%d %T", dateObj);
}

var parseExifDate = function (exifDateTime) {
	exifDateTime = exifDateTime.replace(/ /g, ":");
	var tsParts = exifDateTime.split(':');

	return new Date(tsParts[0], tsParts[1] - 1, tsParts[2], tsParts[3], tsParts[4], tsParts[5])
}


var shiftTimestamp = function (options) {
	if (options.rootDir && options.includedPhotosFilter) {
		enumerate(options.rootDir, function (err, results) {
			results.forEach(function (result) {

				if (result.toLowerCase().endsWith('jpg')) {
					var jpeg = fs.readFileSync(result);
					var data = jpeg.toString("binary");
					var exifObj = piexif.load(data);
					//console.log(piexif)
					//console.log(exifObj)
					console.log("DateTime in Exif", exifObj["Exif"][piexif.ExifIFD.DateTimeOriginal]);
					console.log("DateTime in 0th", exifObj["0th"][piexif.ImageIFD.DateTime]);

					var originalDate = parseExifDate(exifObj["Exif"][piexif.ExifIFD.DateTimeOriginal]);

					console.log("old", originalDate);
					console.log("old", convertToExifDate(originalDate));
					console.log("new", addSeconds(options.shiftAmount, originalDate));
					
					var shiftedFormattedDate = convertToExifDate(addSeconds(options.shiftAmount, originalDate))
					
					console.log("new", shiftedFormattedDate);
				
					
					exifObj["Exif"][piexif.ExifIFD.DateTimeOriginal] = shiftedFormattedDate;
					exifObj["0th"][piexif.ImageIFD.DateTime] = shiftedFormattedDate;
					var exifbytes = piexif.dump(exifObj);
					var newData = piexif.insert(exifbytes, data);
					var newJpeg = new Buffer(newData, "binary");
					fs.writeFileSync(result, newJpeg);
				}
			});
		})
	}

}


module.exports = shiftTimestamp;