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

echo "Start day generation ..."

dayIndex="$1"
dayIndexFormatted="$1"

if [[ ${#dayIndexFormatted} -eq 1 ]]; then
  dayIndexFormatted="0$dayIndexFormatted"
fi

readonly GEN_DIR=$(dirname "$0")
readonly TARGET_DIR="$GEN_DIR/../src/days/day-$dayIndexFormatted"

mkdir "$TARGET_DIR"

dayData=$(getDayDataJson "$dayIndex" "$dayIndexFormatted")

touch "$TARGET_DIR/data.txt"
mustache "$dayData" "$GEN_DIR/day-test.mustache" "$TARGET_DIR/day-$dayIndexFormatted.test.ts"
mustache "$dayData" "$GEN_DIR/day.mustache" "$TARGET_DIR/day-$dayIndexFormatted.ts"

rm "$dayData"

echo Day "$dayIndex" succesfully generated.