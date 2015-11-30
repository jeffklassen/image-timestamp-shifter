var shiftTimestamp = require('./lib/shiftTimestamp');

var options = {
	shiftAmount: -20820,
	rootDir: '/Volumes/My Passport/tmp',
	includedPhotosFilter: function(exif)
	{
		return true;
	}
}

shiftTimestamp(options);