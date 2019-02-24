const dayjs = require("dayjs")
import {
  handler as fake,
  dumpExifHeader,
  dumpFileDateName,
  dumpExifTimeFileDateName,
  setExifTime,
  setFileTimeToExifTime
} from "../../src/commands/fake"
import { runWithAnswers, ENTER } from "../utils"
import * as utils from "../../src/utils"

// silence outputs
jest.mock("inquirer/lib/utils/screen-manager")
jest.mock("../../src/utils")

const executeInfo = jest.spyOn(utils, "execute")
// const renderQuestion = jest.spyOn(
//   require("inquirer/lib/utils/screen-manager").prototype,
//   "render"
// )

afterEach(() => {
  executeInfo.mockReset()
})

describe("jheadx fake - jhead command generation", () => {
  test("dumpExifHeader", () =>
    expect(dumpExifHeader("./test/path")).toBe("jhead -exifmap ./test/path"))
  test("dumpFileDateName", () =>
    expect(dumpFileDateName("./test/path")).toBe(
      "jhead -exifmap ./test/path | sort | tail -n +3 | head -2"
    ))
  test("dumpExifTimeFileDateName", () =>
    expect(dumpExifTimeFileDateName("./test/path")).toBe(
      "jhead -exifmap ./test/path | sort | tail -n +3 | head -3"
    ))
  test("setExifTime", () =>
    expect(setExifTime(dayjs("1984:02:21-17:00:00"), "./test/path")).toBe(
      "jhead -q -ts1984:02:21-17:00:00 ./test/path"
    ))
  test("setFileTimeToExifTime", () =>
    expect(setFileTimeToExifTime("./test/path")).toBe(
      "jhead -q -ft ./test/path"
    ))
  it("jheadx fake - snapshot test", async () => {
    await runWithAnswers(() => fake(), [
      "-d ./img/test -s 2014-01-24-14:30 -f 2014-01-24-18:00",
      ENTER
    ])
    expect(executeInfo.mock.calls[0][0]).toMatchSnapshot()
  })
})

// describe("fake", () => {
//   it("jheadx fake - fake the timestamps", async () => {
//     await runWithAnswers(() => fake(), ["-d", ENTER])
//     expect(renderQuestion.mock.calls[0][0]).toMatchSnapshot()
//     expect(executeInfo).toHaveBeenCalledTimes(2)
//     expect(executeInfo.mock.calls[0][0]).toMatchSnapshot()
//     expect(executeInfo.mock.calls[1][0]).toMatchSnapshot()
//   })

// it("says fake with the right name, without asking it if provided", async () => {
//   await runWithAnswers(() => fake()
//   expect(renderQuestion).not.toHaveBeenCalled()
//   expect(logInfo).toHaveBeenCalledTimes(1)
//   expect(logInfo.mock.calls[0][0]).toMatchSnapshot()
// })
// })

// npm run-script build && npm run-script reset && node dist/index.js fake -d ./img/test -s "dec 12 2012 14:56" -f "dec 12 2012 16:02"
