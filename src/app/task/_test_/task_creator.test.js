const taskName = require("../task_functions");
const edit = require("../task_functions");
const remove = require("../task_functions");
const maxLength = 255;

//test cases that task does not exceed character limit and is not empty
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

//test cases that task will be updated/ edited
describe("task name is updated when edited", () => {
  it("should have updated text", () => {
    let original = edit("Go to the Store");
    let result = edit("Go to the Mall"); //new task name
    expect(edit(original, result)).toBeTruthy();
  });
  it("should return the original text if the text is the same", () => {
    let original = edit("Go to the Store");
    let result = edit("Go to the Store");
    expect(edit(original, result)).toBeFalsy();
  });
  it("should return edited text if the text capitalization changes", () => {
    let original = edit("Go to the Store");
    let result = edit("Go to the store");
    expect(edit(original, result)).toBeTruthy();
  });
  it("should return error message when edited text is left blank", () => {
    let original = edit("Go to the Store");
    let result = edit("");
    expect(edit(original, result)).toBeTruthy();
  });
});
//test cases will deleted when prompted
describe("detects when task is remove(deleted)", () => {
  it("should remove task", () => {
    let original = remove("Go to the Store");
    let result = remove(""); //new task name
    expect(remove(original, result)).toBeTruthy();
  });
});
