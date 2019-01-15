import * as yargs from "yargs"
import { dateFormat, logDetail, logError, logInfo, logger } from "../utils"
import { log } from "util"
const dayjs = require("dayjs")

export const command = "fake"
export const desc = `Fake Timestamps`

export async function handler() {
  try {
    var argv = yargs
      .option("s", {
        alias: "start",
        demandOption: true,
        describe: "start time",
        type: "string"
      })
      .option("f", {
        alias: "finish",
        demandOption: true,
        describe: "finish time",
        type: "string"
      }).argv

    console.log("Fake Timestamps")
    const start = dayjs(argv.s)
    const finish = dayjs(argv.f)

    console.log(
      "Start",
      start.format(dateFormat),
      "Finish",
      finish.format(dateFormat)
    )

    const difference = finish.diff(start, "second")
    console.log("Difference (expressed in different Units)")
    console.log(finish.diff(start, "day"), "day")
    console.log(finish.diff(start, "hour"), "hour")
    console.log(finish.diff(start, "minute"), "minute")
    console.log(finish.diff(start, "second"), "second")

    log("test")
    logDetail("detail")
    logError("error")
    logInfo("Info")
    logger.info("Winston Test")
    logger.warn("winston warn")
    logger.error("winston error")
    logger.debug("winston debug")
  } catch (e) {
    console.log("[ERROR]", e)
  }
}
