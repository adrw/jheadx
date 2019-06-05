import { execSync } from "child_process"
import * as fs from "fs-extra"
import yargs = require("yargs")
import * as winston from "winston"

export * from "./jhead"
export const dateFormat = "YYYY-MM-DD HH:mm:ss:SSS"
export const jheadTimeFormat = "YYYY:MM:DD-HH:mm:ss"
export const jheadDateFormat = "YYYY:MM:DD"

const { colorize, combine, label, printf } = winston.format
export const logger = winston.createLogger({
  level: "debug",
  format: combine(
    colorize(),
    label({ label: "jheadx" }),
    printf(info => `[${info.label}][${info.level}]\n${info.message}`)
  ),
  transports: [new winston.transports.Console()]
})

export const jheadCmdFromArgs = () => {
  let args = process.argv
  args.splice(0, 1)
  args[0] = "jhead"
  return args.join(" ")
}

export const execute = (cmd: string) => {
  try {
    const result = execSync(cmd, { stdio: "pipe", encoding: "utf-8" })
    return result
  } catch (e) {
    return e
  }
}

export const lsJpeg = async (directory: string) => {
  let files
  try {
    files = await fs
      .readdir(directory)
      .then(files =>
        files.filter(
          file =>
            !file.endsWith("DS_Store") &&
            (file.endsWith(".jpg") || file.endsWith(".jpeg"))
        )
      )
  } catch (e) {
    logger.error(
      `[ERROR] Failed to list files in directory: ${directory}. ${e}`
    )
  }
  return files
}
