#!/usr/bin/env node

import * as yargs from "yargs"
import { jheadCmdFromArgs, runJheadCmd, logInfo } from "./utils"

yargs
  .commandDir("commands")
  .demandCommand(1)
  .fail((msg, error) => {
    console.log(msg)
    console.log(error)
    const cmd = jheadCmdFromArgs()
    logInfo(`Now running: $ ${cmd}`)
    runJheadCmd(cmd)
  }).argv
