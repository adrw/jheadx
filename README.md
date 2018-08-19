# jheadx

`jhead` wrapper with extended functionality to batch fix with photos lacking EXIF data

# Added Commands
- `$ jheadx -xr {sourceDir} {restoreDir}`: jhead**x** **r**estores EXIF from files in the source directory to any matching filenames on the restore directory
- `$ jheadx -xf {sourceDir} {startDateTime} {endDateTime}`: jhead**x** **f**akes timestamps in a directory of photos. It loops over input files setting EXIT timestamp and file modification timestamp to a sequentially increasing time linearly distributed between `startDateTime` and `endDateTime`. Helpful for restoring fake EXIF timestamps that mirror in timestamps the sorted-by-name ordering of photo files in a source directory. This provides a fake timeline that makes use of photos in libraries easier since they remain in order and are approximately accurate to the date or time block that they were taken in.

# Resources
- [jhead](http://www.sentex.net/~mwandel/jhead/)