const emailAddress = require("../username_register");
const filledInField = require("../username_register");

describe("checking email address is valid", () => {
  it("should contain a @", () => {
    let result = emailAddress("test@gmail.com");
    expect(emailAddress(result)).toContain("@");
  });
  it("should contain a period", () => {
    let result = emailAddress("test@gmail.com");
    expect(emailAddress(result)).toContain(".");
  });

  describe("is email address is in field", () => {
    it("there should be text", () => {
      let result = filledInField("test@gmail.com");
      expect(result).toBeTruthy();
    });
    it("should return falsy for empty field", () => {
      let result = filledInField("");
      expect(result).toBeFalsy();
    });
  });
});
