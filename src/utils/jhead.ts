const dayjs = require("dayjs")
import { jheadTimeFormat } from "../utils"

export const dumpExifHeader = (path: string) => `jhead -exifmap ${path}`

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
