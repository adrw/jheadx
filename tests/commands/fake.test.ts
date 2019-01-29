import { handler as fake } from "../../src/commands/fake"
import { runWithAnswers, ENTER } from "../utils"
import * as utils from "../../src/utils"

// silence outputs
jest.mock("inquirer/lib/utils/screen-manager")
jest.mock("../../src/utils")

const executeInfo = jest.spyOn(utils, "execute")
const renderQuestion = jest.spyOn(
  require("inquirer/lib/utils/screen-manager").prototype,
  "render"
)

afterEach(() => {
  executeInfo.mockReset()
  renderQuestion.mockReset()
})

describe("fake", () => {
  it("says hello with the right name, after asking it if not provided", async () => {
    await runWithAnswers(() => fake(), ["-d", ENTER])
    expect(renderQuestion.mock.calls[0][0]).toMatchSnapshot()
    expect(executeInfo).toHaveBeenCalledTimes(2)
    expect(executeInfo.mock.calls[0][0]).toMatchSnapshot()
    expect(executeInfo.mock.calls[1][0]).toMatchSnapshot()
  })

  // it("says fake with the right name, without asking it if provided", async () => {
  //   await runWithAnswers(() => fake()
  //   expect(renderQuestion).not.toHaveBeenCalled()
  //   expect(logInfo).toHaveBeenCalledTimes(1)
  //   expect(logInfo.mock.calls[0][0]).toMatchSnapshot()
  // })
})

// npm run-script build && npm run-script reset && node dist/index.js fake -d ./img/test -s "dec 12 2012 14:56" -f "dec 12 2012 16:02"
