#!/usr/bin/env node

"use strict"

const program = require("commander")
const dayjs = require("dayjs")

program
  .version('0.0.1', '-v, --version')
  .option('-x, --extended', 'jheadx extended option prefix')
  .option('-f, --fake', 'fake timestamps')
  .option('-r, --restore', 'restore timestamps')
  .parse(process.argv)

if (program.extended) {
  if (program.fake) {
    console.log("fake") 

  } else if (program.restore) {
    console.log("restore") 
  }
} else {
  console.log("$ jhead", process.argv[2])
}

// program
//   .parseOptions(process.argv)
