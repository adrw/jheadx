#!/usr/bin/env bash
# By Andrew Paradi | Source at https://github.com/adrw/jheadx

# set up bash to handle errors more aggressively - a "strict mode" of sorts
set -e # give an error if any command finishes with a non-zero exit code
set -u # give an error if we reference unset variables
set -o pipefail # for a pipeline, if any of the commands fail with a non-zero exit code, fail the entire pipeline with that exit code

if [ ! -f ~/.adrw-functions ]; then
  curl -s0 https://raw.githubusercontent.com/adrw/.files/master/ansible/roles/functions/files/.adrw-functions -o ~/.adrw-functions
fi
source ~/.adrw-functions
ADRWL_LEVEL=$ADRWL_ALL

function usage {
cat << EOF
❓  Usage :: jheadx <opts>

-h    Show help menu

-xf {sourceDir} {startDateTime} {endDateTime}

    Fake timestamps uniformly across directory of files

    sourceDir: 
    startDateTime:
    endDateTime:

-xr {sourceDir} {restoreDir}

    Restore timestamps to matching filenames from a source directory

    sourceDir:
    restoreDir:
EOF
  exit 0
}

function fake_timestamps {
  directory=$1
  echo "$directory"
  startDateTime=$2
  minuteDifference=$3

  echo "options"
  echo "startDateTime: $startDateTime"
  echo "minuteDiference: $minuteDifference"

  echo "$directory $startDateTime $minuteDifference"

  echo "not built yet, exiting"
  exit 0

  currentHour=$(date "%Y:%m:%d/%H:%M:%S" "$startDateTime" +"%H")
  currentMinute=$(date "%Y:%m:%d/%H:%M:%S" "$startDateTime" +"%M")

  for photo in $directory; do
    # create basic empty header with thumbnail
    # jhead -mkexif -rgt $photo
    # 4
    # jhead -ts
    echo "$currentHour $currentMinute"
    # nextMinute=$(( $currentMinute + $minuteDifference))
    # [ nextMinute -gt 60 ] && currentHour++ || currentMinute=$nextMinute
  done
  exit 0
}

function restore_timestamps {
  echo "func: restore timestamps"

  exit 0
  # Check if file exists in other directory
  for file in * ; do [ -f "../images/$file" ] && echo "$file" ; done

  exit 0
}

CMD_X=0
CMD_F=0
CMD_R=0

while getopts "h?xrfabcdegijklmnopqstuvwyz" opt; do
  case "$opt" in
  h)  usage
      exit 0
      ;;
  x)  echo "CMD_X"
      CMD_X=1
      ;;
  f)  ((CMD_X)) && CMD_F=1 ;;
  r)  ((CMD_X)) && CMD_R=1 ;;
  *)  echo "$ jhead $*"
      exit 0
      ;;
  esac
done

((CMD_X)) && ((CMD_F)) && echo "-xf   fake timestamps" && fake_timestamps "$@"
((CMD_X)) && ((CMD_R)) && echo "-xr   restore timestamps" && restore_timestamps "$@"

echo "No matching command in jhead or jheadx."
exit 1
