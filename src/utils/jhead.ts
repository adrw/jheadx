import { execSync } from "child_process"
const dayjs = require("dayjs")
import { jheadTimeFormat, logger } from "../utils"

export const installJheadWarning = () => {
  logger.error(
    "No local jhead installation found \n Linux: sudo apt-get update && sudo apt-get install -y jhead \n Mac: brew install jhead"
  )
}

export const jhead = (cmd: string) => {
  try {
    const result = execSync(cmd, { stdio: "pipe", encoding: "utf-8" })
    return result
  } catch (e) {
    installJheadWarning()
  }
}

export const dumpExifHeader = (path: string) => `jhead -exifmap ${path}`

export const dumpExifMap = (path: string) =>
  `${dumpExifHeader(path)} | grep Map`

export const osAgnosticFileDateTime = (path: string) =>
  `${dumpExifHeader(path)} | grep -v Map`

export const dumpFileDateName = (path: string) =>
  `${dumpExifHeader(path)} | sort | tail -n +3 | head -2`

export const dumpExifTimeFileDateName = (path: string) =>
  `${dumpExifHeader(path)} | sort | tail -n +3 | head -3`

export const makeExifSection = (
  path: string,
  outputVerbosityControl: string = "-q"
) => `jhead ${outputVerbosityControl} -mkexif ${path}`

export const setExifTime = (
  newTime: number,
  path: string,
  outputVerbosityControl: string = "-q"
) =>
  `jhead ${outputVerbosityControl} -ts${dayjs(newTime).format(
    jheadTimeFormat
  )} ${path}`

export const setFileTimeToExifTime = (
  path: string,
  outputVerbosityControl: string = "-q"
) => `jhead ${outputVerbosityControl} -ft ${path}`
