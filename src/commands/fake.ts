import * as yargs from "yargs"
import { dateFormat } from "../utils"
const dayjs = require("dayjs")

export const command = "fake"
export const desc = `Fake Timestamps`

export async function handler() {
  var argv = yargs
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

  console.log("Fake Timestamps")
  const start = dayjs(argv.s)
  const finish = dayjs(argv.f)

  console.log(
    "Start",
    start.format(dateFormat),
    "Finish",
    finish.format(dateFormat)
  )

  const difference = finish.diff(start)
  console.log("Difference", dayjs(difference).format(dateFormat))
}
