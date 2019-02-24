#!/usr/bin/env node

import * as yargs from "yargs"
import { jheadCmdFromArgs, execute, logger } from "./utils"

yargs
  .commandDir("commands")
  .demandCommand(1)
  .option("c", {
    alias: "compareDirectory",
    describe: "source directory (compare)",
    type: "string"
  })
  .option("d", {
    alias: "directory",
    describe: "source directory (master)",
    type: "string"
  })
  .option("s", {
    alias: "start",
    describe: "start time",
    type: "string"
  })
  .option("f", {
    alias: "finish",
    describe: "finish time",
    type: "string"
  })
  .fail((msg, error) => {
    logger.debug(msg)
    logger.error(error)
    const cmd = jheadCmdFromArgs()
    logger.info(`Now running: $ ${cmd}`)
    logger.info(execute(cmd))
  }).argv
