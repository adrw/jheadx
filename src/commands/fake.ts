import * as yargs from "yargs"
import { execute, jheadTimeFormat, logger } from "../utils"
const dayjs = require("dayjs")
import * as fs from "fs-extra"

export const command = "fake -d -s -f"
export const desc = `Fake timestamps on a linear distribution between start and finish times`

const outputVerbosityControl = "-q"

export const dumpExifHeader = (path: string) => `jhead -exifmap ${path}`

export const dumpFileDateName = (path: string) =>
  `${dumpExifHeader(path)} | sort | tail -n +3 | head -2`

export const dumpExifTimeFileDateName = (path: string) =>
  `${dumpExifHeader(path)} | sort | tail -n +3 | head -3`

export const makeExifSection = (path: string) =>
  `jhead ${outputVerbosityControl} -mkexif ${path}`

export const setExifTime = (newTime: number, path: string) =>
  `jhead ${outputVerbosityControl} -ts${dayjs(newTime).format(
    jheadTimeFormat
  )} ${path}`

export const setFileTimeToExifTime = (path: string) =>
  `jhead ${outputVerbosityControl} -ft ${path}`

export const handler = async () => {
  try {
    var argv = yargs
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

    // Initialize filesystem
    const directory = argv.d
    const files = await fs
      .readdir(directory)
      .then(files => files.filter(file => !file.endsWith("DS_Store")))

    // Calculate date range and step size
    const start = dayjs(argv.s)
    const finish = dayjs(argv.f)
    const difference = finish.diff(start)
    const increment = difference / files.length

    // Loop over files and update Exif and file timestamp to new time
    let path = ""
    for (let i = 0; i < files.length; i++) {
      path = `${directory}/${files[i]}`
      logger.debug(execute(dumpFileDateName(path)))
      while (
        execute(setExifTime(start + i * increment, path)).includes(
          "contains no Exif timestamp to change"
        )
      ) {
        execute(makeExifSection(path))
      }
      execute(setFileTimeToExifTime(path))
      logger.debug(execute(dumpExifTimeFileDateName(path)))
    }
    logger.debug("Done. 🍺")
  } catch (e) {
    logger.error("[ERROR]", e)
  }
}
