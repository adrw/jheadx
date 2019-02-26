const dayjs = require("dayjs")
const ProgressBar = require("progress")
import * as yargs from "yargs"
import {
  execute,
  jhead,
  logger,
  osAgnosticFileDateTime,
  dumpExifTimeFileDateName,
  dumpFileDateName,
  lsJpeg,
  makeExifSection,
  setExifTime,
  setFileTimeToExifTime
} from "../utils"

export const command = "fake"
export const desc = `-d -s -f : generate fake EXIF  and file atimestamps on a linear distribution between start and finish times`

export const fake = async (
  directory: string,
  startString: string,
  finishString: string
) => {
  // Initialize filesystem
  const files = await lsJpeg(directory)

  // Calculate date range and step size
  const start = dayjs(startString)
  const finish = dayjs(finishString)
  const difference = finish.diff(start)
  const increment = difference / files.length

  // Debug Input Parameters
  logger.debug(`Directory: ${directory}`)
  logger.debug(`Start Time: ${start.format()}`)
  logger.debug(`Finish Time: ${finish.format()}`)
  logger.debug(`Increment (ms): ${increment}`)
  logger.debug(`Files: ${lsJpeg(directory)}`)

  const env = execute("printenv env")
  // Loop over files and update Exif and file timestamp to new time
  const bar = new ProgressBar("fake [:bar]", {
    complete: "=",
    incomplete: " ",
    width: 70,
    total: files.length
  })
  let path = ""
  let timestamp = 0
  let abandoned = []
  for (let i = 0; i < files.length; i++) {
    bar.tick(1)
    path = `${directory}/${files[i]}`
    timestamp = start + i * increment
    try {
      let oldFileDateName
      if (env && env.toString().startsWith("TEST")) {
        oldFileDateName = jhead(osAgnosticFileDateTime(path))
      } else {
        oldFileDateName = jhead(dumpFileDateName(path))
      }
      const setResult = await jhead(setExifTime(timestamp, path))
      if (setResult.includes("contains no Exif timestamp to change")) {
        await jhead(makeExifSection(path))
        await jhead(setExifTime(timestamp, path))
      }
      jhead(setFileTimeToExifTime(path))
      let newExifTimeFileDateName
      if (env && env.toString().startsWith("TEST")) {
        newExifTimeFileDateName = jhead(osAgnosticFileDateTime(path))
        logger.debug(`${oldFileDateName}=> \n${newExifTimeFileDateName}`)
      } else {
        // TODO add option to log this if in verbose mode and hide the progress bar
        newExifTimeFileDateName = jhead(dumpExifTimeFileDateName(path))
      }
    } catch (e) {
      abandoned.push({ path })
      logger.error(
        `Fatal error when running fake command on ${path} with timestamp ${timestamp}.`,
        e
      )
    }
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
    fake(argv.d, argv.s, argv.f)
  } catch (e) {
    logger.error("[ERROR]", e)
  }
}
