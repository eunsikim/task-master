// script to test that email address (username) meets all the requirements and is considered valid

const emailAddress = require("../username_register");
const filledInField = require("../username_register");

describe("checking email address is valid", () => {
  //valid email address with a @
  it("should contain a @", () => {
    let result = emailAddress("test@gmail.com");
    expect(result).toContain("@");
  });
  it("should detect if no @ in email address", () => {
    let result = emailAddress("testgmail.com");
    expect(result).not.toContain("@");
  });

  it("should contain a period after the @", () => {
    let result = emailAddress("test@gmail.com");
    let index = result.indexOf("@)");
    let resultSubtring;
    resultSubtring = result.subtring(index);
    expect(resultSubtring).toContain(".");
  });
  it("should detect if there is not a period after the @", () => {
    let result = emailAddress("test@gmailcom");
    let index = result.indexOf("@)");
    let resultSubtring;
    resultSubtring = result.subtring(index);
    expect(resultSubtring).not.toContain(".");
  });
  it("should only contain letters, periods, underlines, numbers, and @ symbol; anything else should result in an invalid email", () => {
    let result = emailAddress("te$t@gmail.com");
    //emailAddress() will check if email address contains the correct characters, otherwise return false
    expect(result).toBeFalsy();
  });
  it("should not contain two periods in a row", () => {
    let result = emailAddress("test@gmail..com");
    expect(result).toContain(".."); //testing 2 periods in the email address
  });
  it("domain should contain text after the period", () => {
    let result = emailAddress("test@gmail.");
    //emailAddress() will check that email address does not end with a period
    expect(result).toBeFalsy();
  });
});

describe("is there an email address is in field", () => {
  it("there should be text in the field box", () => {
    let result = filledInField("test@gmail.com");
    expect(result).toBeTruthy();
  });
  it("should return falsy for empty field", () => {
    let result = filledInField("");
    expect(result).toBeFalsy();
  });
});
