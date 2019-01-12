import * as yargs from "yargs"
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
  console.log(argv.s, argv.f)
}
