#!/bin/bash

day="day1"

deno run -A "$day.ts"
python3 "$day.py"
java "$day.java"
lua "$day.lua"
runghc "$day.hs"
go run "$day.go"

gcc "$day.c" -o "$day-c"
"./$day-c"
rm "$day-c"

rustc "$day.rs" -o "$day-rs"
"./$day-rs"
rm "$day-rs"
