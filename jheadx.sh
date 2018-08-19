# By Andrew Paradi | Source at https://github.com/adrw/jheadx
#!/usr/bin/env bash

# set up bash to handle errors more aggressively - a "strict mode" of sorts
set -e # give an error if any command finishes with a non-zero exit code
set -u # give an error if we reference unset variables
set -o pipefail # for a pipeline, if any of the commands fail with a non-zero exit code, fail the entire pipeline with that exit code

function status() {
  Reset="$(tput sgr0)"       # Text Reset
  Red="$(tput setaf 1)"          # Red
  Green="$(tput setaf 2)"        # Green
  Blue="$(tput setaf 4)"         # Blue
  div="********************************************************************************"
  if [ "$#" -lt 3 ]; then   # if no name override passed in, take name "ap" if $0 is status, $0 otherwise
    [ $(basename "${0}") = "status" ] && scriptname="ap" || scriptname=$(basename "${0}")
  else
    scriptname="${3}"
  fi
  case "${1}" in
    a)        echo ""; echo "${Blue}<|${scriptname:0:1}${Reset} [ ${2} ] ${div:$((${#2}+9))}" ;;
    b)        echo "${Green}ok: [ ${2} ] ${div:$((${#2}+9))}${Reset}" ;;
    s|status) echo "${Blue}<|${scriptname:0:1}${Reset} [ ${2} ] ${div:$((${#2}+9))}" ;;
    t|title)  echo "${Blue}<|${scriptname}${Reset} [ ${2} ] ${div:$((${#2}+8+${#scriptname}))}" ;;
    e|err)    echo "${Red}fatal: [ ${2} ] ${div:$((${#2}+12))}${Reset}" ;;
  esac
}

function show_help {
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
  echo "func: fake timestamps"
  echo "not built yet, exiting"
  exit 0

  startDateTime=$1
  directory=$2
  minuteDifference=$3

  echo $startDateTime $directory $minuteDifference

  currentHour=$(date "%Y:%m:%d/%H:%M:%S" $startDateTime +"%H")
  currentMinute=$(date "%Y:%m:%d/%H:%M:%S" $startDateTime +"%M")

  for photo in $directory; do
    # create basic empty header with thumbnail
    # jhead -mkexif -rgt $photo
    # 4
    # jhead -ts
    echo $currentHour $currentMinute
    # nextMinute=$(( $currentMinute + $minuteDifference))
    # [ nextMinute -gt 60 ] && currentHour++ || currentMinute=$nextMinute
  done
  exit 0
}

function restore_timestamps {
  echo "func: restore timestamps"

  exit 0
  # Check if file exists in other directory
  for file in * ; do [ -f ../images/$file ] && echo $file ; done

  exit 0
}

CMD_X=false
CMD_F=false
CMD_R=false

while getopts "h?xrfabcdegijklmnopqstuvwyz" opt; do
  case "$opt" in
  h)  show_help
      exit 0
      ;;
  x)  echo "CMD_X"
      CMD_X=true
      ;;
  f)  [ "$CMD_X" = true ] && CMD_F=true ;;
  r)  [ "$CMD_X" = true ] && CMD_R=true ;;
  *)  echo "$ jhead $@"
      exit 0
      ;;
  esac
done

[ "$CMD_X" = true ] && [ "$CMD_F" = true ] && echo "-xf   fake timestamps" && fake_timestamps
[ "$CMD_X" = true ] && [ "$CMD_R" = true ] && echo "-xr   restore timestamps" && restore_timestamps

echo "No matching command in jhead or jheadx."
exit 1
