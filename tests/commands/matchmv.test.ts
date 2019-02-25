import { execute } from "../../src/utils"

describe("jheadx matchmv", () => {
  test("run over real image files", async () => {
    await execute("npm run-script reset")
    expect(
      execute(
        "node dist/index.js matchmv -d ./img/smallTest -m ./img/test -r good"
      )
    ).toMatchSnapshot()
  })
})
