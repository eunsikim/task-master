const taskName = require("../task_creator");
const maxLength = 255;

describe("does task meet character limits", () => {
  it("there should be text", () => {
    let result = taskName("Go to the Store");
    expect(result).toBeTruthy();
  });
  it("should return empty if no text", () => {
    let result = taskName("");
    expect(result).toBeFalsy();
  });
  it("should return error if too much text", () => {
    let result = "A";

    while (result.length <= 254) {
      result += result;
    }
    let longSentence = taskName(result);
    expect(longSentence).toBeFalsy();
  });
  describe("does task meet character limits", () => {
    it("there should be text", () => {
      let result = taskName("Go to the Store");
      expect(result).toBeTruthy();
    });
  });
});
