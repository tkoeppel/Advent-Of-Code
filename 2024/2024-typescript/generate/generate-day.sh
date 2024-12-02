#!/bin/bash

function getDayDataJson() {
  local dayIndex="$1"
  local dayIndexFormatted="$2"
  local tempfile=$(mktemp --suffix=.json)

  cat << EOF > "$tempfile"
  {
    "dayIndex": "$dayIndex",
    "dayIndexFormatted": "$dayIndexFormatted"
  }
EOF

  echo "$tempfile"
}

dayIndex="$1"
dayIndexFormatted="$1"

if [[ ${#dayIndexFormatted} -eq 1 ]]; then
  dayIndexFormatted="0$dayIndexFormatted"
fi

readonly FILE_PATH="../src/days/day-$dayIndexFormatted"
mkdir "$FILE_PATH"

dayData=$(getDayDataJson "$dayIndex" "$dayIndexFormatted")

touch "$FILE_PATH/data.txt"
mustache "$dayData" ./day-test.mustache "$FILE_PATH/day-$dayIndexFormatted.test.ts"
mustache "$dayData" ./day.mustache "$FILE_PATH/day-$dayIndexFormatted.ts"

rm "$dayData"