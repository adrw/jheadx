import * as yargs from "yargs"
import { execute, jheadTimeFormat, logger } from "../utils"
const dayjs = require("dayjs")
import * as fs from "fs-extra"

export const command = "match"
export const desc = `-d -m : generate fake EXIF  and file atimestamps on a linear distribution between start and finish times`

const env = execute("printenv env")
const outputVerbosityControl = "-q"

export const dumpExifHeader = (path: string) => `jhead -exifmap ${path}`

export const osAgnosticFileDateTime = (path: string) =>
  `${dumpExifHeader(path)} | grep -v Map`

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

export const ls = async (directory: string) => {
  return fs
    .readdir(directory)
    .then(files => files.filter(file => !file.endsWith("DS_Store")))
}

export const matchmv = async (
  directory: string,
  startString: string,
  finishString: string
) => {
  // Initialize filesystem
  const files = await ls(directory)

  // Calculate date range and step size
  const start = dayjs(startString)
  const finish = dayjs(finishString)
  const difference = finish.diff(start)
  const increment = difference / files.length

  // Debug Input Parameters
  logger.debug(`Directory: ${directory}`)
  logger.debug(`Start Time: ${start.format()}`)
  logger.debug(`Finish Time: ${finish.format()}`)
  logger.debug(`Increment: ${increment}`)

  // Loop over files and update Exif and file timestamp to new time
  let path = ""
  for (let i = 0; i < files.length; i++) {
    path = `${directory}/${files[i]}`
    let oldFileDateName
    if (env && env.toString().startsWith("CI")) {
      oldFileDateName = execute(osAgnosticFileDateTime(path))
    } else {
      oldFileDateName = execute(dumpFileDateName(path))
    }
    while (
      execute(setExifTime(start + i * increment, path)).includes(
        "contains no Exif timestamp to change"
      )
    ) {
      execute(makeExifSection(path))
    }
    execute(setFileTimeToExifTime(path))
    let newExifTimeFileDateName
    if (env && env.toString().startsWith("CI")) {
      newExifTimeFileDateName = execute(osAgnosticFileDateTime(path))
    } else {
      newExifTimeFileDateName = execute(dumpExifTimeFileDateName(path))
    }
    logger.debug(`${oldFileDateName}=> \n${newExifTimeFileDateName}`)
  }
  logger.debug("Done. 🍺")
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

    matchmv(argv.d, argv.s, argv.f)
  } catch (e) {
    logger.error("[ERROR]", e)
  }
}
