import { execSync } from "child_process"
import yargs = require("yargs")
import * as winston from "winston"

export const dateFormat = "YYYY-MM-DD HH:mm:ss:SSS"
export const jheadTimeFormat = "YYYY:MM:DD-HH:mm:ss"
export const jheadDateFormat = "YYYY:MM:DD"

const { colorize, combine, label, printf } = winston.format
export const logger = winston.createLogger({
  level: "debug",
  format: combine(
    colorize(),
    label({ label: "jheadx" }),
    printf(info => `[${info.label}][${info.level}\t] ${info.message}`)
  ),
  transports: [new winston.transports.Console()]
})

export const jheadCmdFromArgs = () => {
  let args = process.argv
  args.splice(0, 1)
  args[0] = "jhead"
  return args.join(" ")
}

export const runCommand = (cmd: string) => {
  try {
    const result = execSync(cmd, { stdio: "pipe", encoding: "utf-8" })
    logger.info(result)
    return result
  } catch (e) {
    logger.info(e.stdout)
    logger.info(e.stderr)
  }
}

export const handleFail = (): void => {
  logger.info(yargs.help().version())
  // const cmd = jheadCmdFromArgs()
  // logInfo(`Now running: $ ${cmd}`)
  // runCommand(cmd)
}
