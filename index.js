var shiftTimestamp = require('./lib/shiftTimestamp');
var piexif = require("piexifjs");
var options = {
	shiftAmount: -20820,
	rootDir: '/Volumes/My Passport/tmp',
	includedPhotosFilter: function(exif)
	{
		var should = true;
		
		if(exif["0th"][piexif.ImageIFD.Model]!="Canon EOS REBEL T3"){
			should = false;
		}
		console.log(should);
		return should;
	}
}

shiftTimestamp(options);