import { execute } from "../../src/utils"

describe("jheadx matchmv", () => {
  test("run over real image files", async () => {
    expect(
      execute(
        "node dist/index.js matchmv -d ./img/smallTest1 -m ./img/test -r good"
      )
    ).toMatchSnapshot()
  })
})
