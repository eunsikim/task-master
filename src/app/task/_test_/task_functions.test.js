const taskArray = require("../task_functions");
const taskName = require("../task_functions");
const edit = require("../task_functions");
const remove = require("../task_functions");
const maxLength = 255;

describe("tasks are added to array", () => {
  it("tasks should be added to the array", () => {
    let resultArray = taskArray([]);
    resultArray.push("Go the store");
    expect(result).toContain("Go to the store");
  });
});

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
    let result = edit("go to the store");
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
    const original = [];
    original[0] = "Go to the mall";
    original[1] = "Go to the store";
    original[2] = "Go to the park";
    original.remove([1]); //code would remove task; task indexs may need to shift down 1 if there is 2+ tasks
    let result = [];
    result[0] = "Go to the mall";
    result[1] = "Go to the park";
    expect(remove(original).toEqual(result));
  });
});
