# jheadx

[![CircleCI](https://circleci.com/gh/adrw/jheadx.svg?style=svg)](https://circleci.com/gh/adrw/jheadx) [![npm](https://img.shields.io/npm/v/jheadx.svg?label=jheadx)](https://www.npmjs.com/package/jheadx)

`$ jhead` extended to handle complex batch photo and EXIF data manipulation

# New Commands

- `$ jheadx fake -d {sourceDir} -s {startDateTime} -f {endDateTime}`: jhead**x** **f**akes timestamps in a directory of photos.
  - It loops over input files setting EXIF timestamp and file modification timestamp to a sequentially increasing time linearly distributed between `startDateTime` and `endDateTime`.
  - Helpful for restoring fake EXIF timestamps that mirror in timestamps the sorted-by-name ordering of photo files in a source directory.
  - This provides a fake timeline that makes use of photos in libraries easier since they remain in order and are approximately accurate to the date or time block that they were taken in.
  - **Note:** sorting is done in a simple `nodejs` sort such that the following are all valid orderings. Thus, to ensure the correct order, use the same number of digits for photo numbers (ie. pad with leading 0s).
    - `[Photo-1.png,Photo-10.png,Photo-18.png,Photo-19.png,Photo-2.png,Photo-24.png,Photo-3.png,Photo-5.png,Photo-6.png,Photo-8.png]`
    - `[photo-00001.png,photo-00002.png,photo-00005.png,photo-00008.png,photo-00009.png,photo-00010.png,photo-00014.png,photo-00016.png,photo-00023.png,photo-00027.png]`
  - Example Usage: `$ jheadx fake -d ./img/test -s 2014-01-24-14:30 -f 2014-01-24-18:00`
- `$ jhead matchmv -d {sourceDir} -m {matchDir} -p {renamePrefix}`: jhead**x** **m**atches files from source directory to the match directory and renames the matched files in the match directory with the `renamePrefix`.
  - It makes most sense to have the match directory be a superset of the source directory.
  - Image files are compared using [`Resemble.js`](https://github.com/rsmbl/Resemble.js).
  - Note, the matching algorithm between the directories is still `O(n^2)` so it will really chug on large directories.
- **Coming soon** `$ jheadx restore -d {sourceDir} -r {restoreDir}`: jhead**x** **r**estores EXIF from files in the source directory to any matching filenames on the restore directory

# Required

- `jheadx` does not come with `jhead` as part of the CLI. `jhead` is a peer dependency that must be installed separately. Find install instructions [here](http://www.sentex.net/~mwandel/jhead/) or below:
  - Linux: `sudo apt-get update && sudo apt-get install -y jhead`
  - macOS: `brew install jhead`

# Resources

- [jhead](http://www.sentex.net/~mwandel/jhead/): "Exif Jpeg header manipulation tool" by Matthias Wandel
