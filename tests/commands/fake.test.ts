const dayjs = require("dayjs")
import {
  dumpExifHeader,
  dumpFileDateName,
  dumpExifTimeFileDateName,
  setExifTime
} from "../../src/utils"

describe("jheadx fake", () => {
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
    expect(setExifTime(dayjs("1984-02-21-17:00:00"), "./test/path")).toBe(
      "jhead -q -ts1984:02:21-17:00:00 ./test/path"
    ))
  // FLaky test on different OS / platforms
  // test("run over real image files", async () => {
  //   await execute("npm run-script reset")
  //   expect(
  //     execute(
  //       "export env=CI && node dist/index.js fake -d ./img/test -s 2014-01-24-14:30 -f 2014-01-24-18:00 && unset env"
  //     )
  //   ).toMatchSnapshot()
  // })
})
