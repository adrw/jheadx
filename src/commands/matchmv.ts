const compareImages = require("resemblejs/compareImages")
import * as fs from "fs-extra"
const ProgressBar = require("progress")
import * as yargs from "yargs"
import { lsJpeg, logger } from "../utils"

export const command = "matchmv"
export const desc = `-d -m -r : renamed with prefix matched files in match directory that also are found in source directory`

export const imgDiff = async (
  img1path: string,
  img2path: string,
  diffPath: string = null
) => {
  const data = await compareImages(
    await fs.readFile(img1path),
    await fs.readFile(img2path)
  )

  if (diffPath) {
    await fs.writeFile(diffPath, data.getBuffer())
  }

  const { analysisTime, misMatchPercentage } = data
  return { analysisTime, misMatchPercentage }
}

export const batchImgDiff = async (
  directory: string,
  matchDirectory: string
) => {
  // Initialize filesystem
  const srcFiles = await lsJpeg(directory)
  const matchFiles = await lsJpeg(matchDirectory)

  // Files
  logger.debug(`srcFiles: ${srcFiles}`)
  logger.debug(`matchFiles: ${matchFiles}`)

  // Loop over files, adding to map and renaming with prefix if file matches
  let results: any[] = []
  let sfMatched: any = {}
  let mfMatched: any = {}
  let srcPath = ""
  let matchPath = ""
  const bar = new ProgressBar("matchmv [:bar]", {
    complete: "=",
    incomplete: " ",
    width: 70,
    total: matchFiles.length * srcFiles.length
  })
  for (const mf of matchFiles) {
    bar.tick(1)
    if (mfMatched[mf]) {
      continue
    }
    matchPath = `${matchDirectory}/${mf}`
    for (const sf of srcFiles) {
      bar.tick(1)
      if (sfMatched[sf]) {
        continue
      }
      srcPath = `${directory}/${sf}`
      try {
        let diffResult = await imgDiff(matchPath, srcPath)
        if (diffResult.misMatchPercentage < 1.0) {
          sfMatched[sf] = mf
          mfMatched[mf] = sf
          results.push({ mf, sf, diffResult })
        }
      } catch (e) {
        logger.error(
          `[ERROR] Processing image diff between ${matchPath} and ${srcPath}. ${e}`
        )
      }
    }
  }
  return results
}

export const matchmv = async (
  directory: string,
  matchDirectory: string,
  renamePrefix: string
) => {
  // Debug Input Parameters
  logger.debug(`Source Directory: ${directory}`)
  logger.debug(`Match Directory: ${matchDirectory}`)
  logger.debug(`Rename Prefix: ${renamePrefix}`)

  const results = await batchImgDiff(directory, matchDirectory)
  for (const res of results) {
    await fs.move(
      `${matchDirectory}/${res.mf}`,
      `${matchDirectory}/${renamePrefix}${res.mf}`
    )
  }
  // Results
  const matchFiles = await lsJpeg(matchDirectory)
  logger.debug(`matchFiles: ${matchFiles}`)
  logger.debug("Done. 🍺")
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
