function meetsRequirements(username) {
  if (username.includes("@" && ".")) {
    console.log("True: username contains a @ and a period");
  } else {
    console.log("False: username is missing requirements and a period");
  }
  return username;
}

function filledInField(fieldText) {
  if (fieldText.length !== 0) {
    console.log("True: there is text in the field box");
  } else {
    console.log("False: field box is empty");
  }

  return fieldText;
}
module.exports = meetsRequirements;
module.exports = filledInField;
