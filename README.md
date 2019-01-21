# jheadx

[![Build Status](https://travis-ci.com/adrw/jheadx.svg?branch=master)](https://travis-ci.org/adrw/jheadx)

`$ jhead` wrapper with extended functionality to batch fix photos lacking EXIF data

# New Commands

- `$ jheadx restore -d {sourceDir} -r {restoreDir}`: jhead**x** **r**estores EXIF from files in the source directory to any matching filenames on the restore directory
- `$ jheadx fake -d {sourceDir} -s {startDateTime} -f {endDateTime}`: jhead**x** **f**akes timestamps in a directory of photos.
  - It loops over input files setting EXIT timestamp and file modification timestamp to a sequentially increasing time linearly distributed between `startDateTime` and `endDateTime`.
  - Helpful for restoring fake EXIF timestamps that mirror in timestamps the sorted-by-name ordering of photo files in a source directory.
  - This provides a fake timeline that makes use of photos in libraries easier since they remain in order and are approximately accurate to the date or time block that they were taken in.
  - **Note:** sorting is done in a simple `nodejs` sort such that the following are all valid orderings. Thus, to ensure the correct order, use the same number of digits for photo numbers (ie. pad with leading 0s).
    - `[Photo-1.png,Photo-10.png,Photo-18.png,Photo-19.png,Photo-2.png,Photo-24.png,Photo-3.png,Photo-5.png,Photo-6.png,Photo-8.png]`
    - `[photo-00001.png,photo-00002.png,photo-00005.png,photo-00008.png,photo-00009.png,photo-00010.png,photo-00014.png,photo-00016.png,photo-00023.png,photo-00027.png]`

# Wrapper

- If a command doesn't match the above new commands, it is executed as a pure `jhead` command. Thus, `jheadx` is a wrapper with additional functionality.
- You can thus alias over `jheadx` as `jhead` with the following in your `.aliases` or equivalent file

```
alias jhead=jheadx
```

# Resources

- [jhead](http://www.sentex.net/~mwandel/jhead/): "Exif Jpeg header manipulation tool" by Matthias Wandel
