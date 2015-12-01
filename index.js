var shiftTimestamp = require('./lib/shiftTimestamp');
var piexif = require("piexifjs");
var utils = require('./lib/utils');

var beforeDateTime = new Date(2014, 06, 10);
console.log(beforeDateTime);

var options = {
	shiftAmount: -20820,
	rootDir: '/sample/dir/here',
	includedPhotosFilter: function (exif) {
		var should = true;
		var beforeDateTime = new Date(2014, 06, 10);
		
		if (exif["0th"][piexif.ImageIFD.Model] != "Canon EOS REBEL T3") {
			should = false;
		}
		if (beforeDateTime > utils.parseExifDate(exif["Exif"][piexif.ExifIFD.DateTimeOriginal])) {
			should = false;
		}

		return should;
	},
	commitChanges: true
}

shiftTimestamp(options);