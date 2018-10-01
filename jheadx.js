#!/usr/bin/env node

"use strict"

const program = require("commander")
const dayjs = require("dayjs")

if (process.argv[2].startsWith("-x")) {
  program
  .version('0.0.1', '-v, --version')
  .option('-x, --extended', 'jheadx extended option prefix')
  .option('-f, --fake', 'fake timestamps')
  .option('-m, --match', 'find matching files from dir1 in dir2')
  .option('-r, --restore', 'restore timestamps')
  .parse(process.argv)

  if (program.extended) {
    if (program.fake) {
      console.log("fake") 

    } else if (program.match) {
      console.log("match") 

    } else if (program.match) {

      console.log("restore") 
    }
  } else {
    console.log("$ jhead", process.argv[2])
  }
} else {
  let args = process.argv
  args.splice(0,1)
  args[0] = "jhead"
  console.log(args.join(" "))
}




// program
//   .parseOptions(process.argv)
