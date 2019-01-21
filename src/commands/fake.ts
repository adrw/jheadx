import * as yargs from "yargs"
import { dateFormat, logger, runCommand, jheadTimeFormat } from "../utils"
const dayjs = require("dayjs")
import * as fs from "fs-extra"
import * as klaw from "klaw"

export const command = "fake"
export const desc = `Fake Timestamps`

const fakeTimestamp = async () => {}

const setExifTime = (newTime: number, directory: string, file: string) => {
  return `jhead -ts${dayjs(newTime).format(
      jheadTimeFormat
    )} ${directory}/${file}`
}

export const handler = async () => {
  try {
    var argv = yargs
      .option("d", {
        alias: "directory",
        demandOption: true,
        describe: "start time",
        type: "string"
      })
      .option("d", {
        alias: "directory",
        demandOption: true,
        describe: "start time",
        type: "string"
      })
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

    const directory = argv.d
    const files = await fs
      .readdir(directory)
      .then(files => files.filter(file => !file.endsWith("DS_Store")))

    const start = dayjs(argv.s)
    const finish = dayjs(argv.f)
    const difference = finish.diff(start)
    const increment = difference / files.length
    for (let i = 0; i < files.length; i++) {
      logger.debug(
        files[i] + " " + dayjs(start + i * increment).format(dateFormat)
      )
      if (runCommand(setExifTime(start + i * increment, directory, files[i]))) {

      }
      break
    }
  } catch (e) {
    logger.error("[ERROR]", e)
  }
}
