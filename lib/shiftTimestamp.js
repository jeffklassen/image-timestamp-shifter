var enumerate = require('./enumerate');
var piexif = require("piexifjs");
var fs = require("fs");
var utils = require('./utils');

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};



var shiftTimestamp = function (options) {
	if (options.rootDir && options.includedPhotosFilter) {
		enumerate(options.rootDir, function (err, results) {
			results.forEach(function (result) {

				if (result.toLowerCase().endsWith('jpg')) {


					var jpeg = fs.readFileSync(result);
					var data = jpeg.toString("binary");
					try {
						var exifObj = piexif.load(data);
						if (options.includedPhotosFilter(exifObj)) {
							console.log("Modifying: ", result);
							//console.log(piexif)
							//console.log(exifObj)
							console.log("DateTime in Exif", exifObj["Exif"][piexif.ExifIFD.DateTimeOriginal]);
							console.log("DateTime in 0th", exifObj["0th"][piexif.ImageIFD.DateTime]);

							var originalDate = utils.parseExifDate(exifObj["Exif"][piexif.ExifIFD.DateTimeOriginal]);

							var shiftedFormattedDate = utils.convertToExifDate(utils.addSeconds(options.shiftAmount, originalDate))

							console.log("New DateTime", shiftedFormattedDate);

							exifObj["Exif"][piexif.ExifIFD.DateTimeOriginal] = shiftedFormattedDate;
							exifObj["0th"][piexif.ImageIFD.DateTime] = shiftedFormattedDate;
							var exifbytes = piexif.dump(exifObj);
							var newData = piexif.insert(exifbytes, data);
							var newJpeg = new Buffer(newData, "binary");
							if (options.commitChanges === true) {
								fs.writeFileSync(result, newJpeg);
								console.log("data written to disk");
							}
						}
						else {
							console.log("NOT MODIFYING: ", result);
						}
					}
					catch (err) {
						console.error('could not parse: ' + result);
					}
				}
			});
		})
	}

}


module.exports = shiftTimestamp;