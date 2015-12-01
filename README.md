# image-timestamp-shifter

Bulk shifts timestamps in set of photos. Only JPG's are supported at the moment. A filter can be provided so that only a subset of photos are edited.

## Usage

```
> npm install
> node index.js
```

## Configuration
To configure which images are shifted and by how much they are shifted, modify the options object that is passed into ```shiftTimestamp(options)```.

A sample options object is as follows:

```
var options = {
	shiftAmount: -20820 //integer for how much to shift the time forward by in seconds,
	rootDir: '/sample/dir/here' //the root dir where you want to start looking for pictures. All searches are recursive.
	includedPhotosFilter: function (exif) { //return true if you want to modify the picture, false if you dont.
	
	  //this will modify all .jpg files under the rootDir above
		return true;
	},
	commitChanges: true //do you want to write the changes to disk? 'false' here would just perform a dryrun.
}
```
