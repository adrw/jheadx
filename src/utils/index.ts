import * as emoji from "node-emoji"
import chalk from "chalk"
import { execSync } from "child_process"
import yargs = require("yargs")

export const log = console.log
export const logError = (s: string) => log(emoji.emojify(chalk.bold.red(s)))
export const logInfo = (s: string) => log(emoji.emojify(chalk.bold(s)))
export const logDetail = (s: string) => log(emoji.emojify(chalk.dim(s)))

export const jheadCmdFromArgs = () => {
  let args = process.argv
  args.splice(0, 1)
  args[0] = "jhead"
  return args.join(" ")
}

export const runJheadCmd = (cmd: string) => {
  try {
    const result = execSync(cmd, { stdio: "pipe", encoding: "utf-8" })
    console.log(result)
  } catch (e) {
    console.log(e.stdout)
    console.log(e.stderr)
  }
}

export const handleFail = (): void => {
  console.log(yargs.help().version())
  // const cmd = jheadCmdFromArgs()
  // logInfo(`Now running: $ ${cmd}`)
  // runJheadCmd(cmd)
}
