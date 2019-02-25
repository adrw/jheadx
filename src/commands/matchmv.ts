import * as yargs from "yargs"
import { ls, logger } from "../utils"
const dayjs = require("dayjs")

export const command = "matchmv"
export const desc = `-d -m -r : renamed with prefix matched files in match directory that also are found in source directory`

export const matchmv = async (
  directory: string,
  matchDirectory: string,
  renamePrefix: string
) => {
  // Initialize filesystem
  const srcFiles = await ls(directory)
  const matchFiles = await ls(matchDirectory)

  // Debug Input Parameters
  logger.debug(`Source Directory: ${directory}`)
  logger.debug(`Match Directory: ${matchDirectory}`)
  logger.debug(`Rename Prefix: ${renamePrefix}`)

  // Loop over files and update Exif and file timestamp to new time
  logger.debug(srcFiles)
  logger.debug(matchFiles)

  // let path = ""
  // for (let i = 0; i < files.length; i++) {
  //   path = `${directory}/${files[i]}`
  //   let oldFileDateName
  //   if (env && env.toString().startsWith("CI")) {
  //     oldFileDateName = execute(osAgnosticFileDateTime(path))
  //   } else {
  //     oldFileDateName = execute(dumpFileDateName(path))
  //   }
  //   while (
  //     execute(setExifTime(start + i * increment, path)).includes(
  //       "contains no Exif timestamp to change"
  //     )
  //   ) {
  //     execute(makeExifSection(path))
  //   }
  //   execute(setFileTimeToExifTime(path))
  //   let newExifTimeFileDateName
  //   if (env && env.toString().startsWith("CI")) {
  //     newExifTimeFileDateName = execute(osAgnosticFileDateTime(path))
  //   } else {
  //     newExifTimeFileDateName = execute(dumpExifTimeFileDateName(path))
  //   }
  //   logger.debug(`${oldFileDateName}=> \n${newExifTimeFileDateName}`)
  // }
  // logger.debug("Done. 🍺")
}

export const handler = async () => {
  try {
    var argv = yargs
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
      }).argv
    matchmv(argv.d, argv.m, argv.r)
  } catch (e) {
    logger.error("[ERROR]", e)
  }
}
