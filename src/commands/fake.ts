import * as yargs from "yargs"
import { dateFormat, logger } from "../utils"
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

    const photos = 20
    const start = dayjs(argv.s)
    const finish = dayjs(argv.f)
    const difference = finish.diff(start, "second")
    const increment = difference / photos
    for (let i = 0; i < photos; i++) {
      logger.debug(dayjs(start + i * increment).format(dateFormat))
    }

    logger.debug(difference)
  } catch (e) {
    logger.error("[ERROR]", e)
  }
}
