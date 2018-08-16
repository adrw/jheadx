#!/bin/sh

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