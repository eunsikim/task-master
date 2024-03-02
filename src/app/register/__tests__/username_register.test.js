const emailAddress = require("../username_register");
const filledInField = require("../username_register");

describe("checking email address is valid", () => {
  it("should contain a @", () => {
    let result = emailAddress("test@gmail.com");
    expect(emailAddress(result)).toContain("@");
  });
  it("should contain a period after the @", () => {
    let result = emailAddress("test@gmail.com");
    let resultSubtring;
    resultSubtring = result.subtring(result.indexOf("@"));
    expect(emailAddress(resultSubstring)).toContain(".");
  });
  it("should only contain letters, periods, underlines, numbers, and @ symbol; anything else should result in an invalid email", () => {
    let result = emailAddress("te$t@gmail.com");
    expect(result).toBeFalsy();
  });
  it("should not contain two periods in a row", () => {
    let result = emailAddress("test@gmail..com");
    expect(result).toBeFalsy();
  });
  it("domain should contain text after the period", () => {
    let result = emailAddress("test@gmail.");
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
