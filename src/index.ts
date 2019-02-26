#!/usr/bin/env node

import * as yargs from "yargs"

yargs
  .commandDir("commands")
  .demandCommand(1)
  .option("d", {
    alias: "directory",
    describe: "source directory",
    type: "string"
  })
  .option("m", {
    alias: "matchDirectory",
    describe: "match directory",
    type: "string"
  })
  .option("r", {
    alias: "renamePrefix",
    describe: "prefix that matched files are renamed with",
    type: "string"
  })
  .option("s", {
    alias: "start",
    describe: "start date+time",
    type: "string"
  })
  .option("f", {
    alias: "finish",
    describe: "finish date+time",
    type: "string"
  }).argv
