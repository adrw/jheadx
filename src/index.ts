#!/usr/bin/env node

import * as yargs from "yargs"
import { jheadCmdFromArgs, runJheadCmd, logger } from "./utils"

yargs
  .commandDir("commands")
  .demandCommand(1)
  .fail((msg, error) => {
    logger.debug(msg)
    logger.error(error)
    const cmd = jheadCmdFromArgs()
    logger.info(`Now running: $ ${cmd}`)
    runJheadCmd(cmd)
  }).argv
