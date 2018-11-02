const util = require("../src/util");

const expect = require("chai").expect;

describe("util.splitMessage", function() {
  it("splits message string into array with correct length and values", function() {
    const message = util.splitMessage({
      message: "Hello world",
      lineLength: 10
    });

    expect(message).to.deep.equal(["Hello worl", "d"]);
  });

  it("doesn't split message when message is smaller then given line length", function() {
    const message = util.splitMessage({
      message: "Hello world",
      lineLength: 20
    });

    expect(message).to.equal("Hello world");
  });
});

describe("util.sanitize", function() {
  it("returns a string with only ASCII characters", function() {
    const message = util.sanitize("Hello world 🦄!");
    expect(message).to.equal("Hello world !");
  });
});

describe("util.removeDiacritics", function() {
  it("returns non accented, ascii characters when given accented characters", function() {
    const message = util.removeDiacritics("éééàààçççèèè");
    expect(message).to.equal("eeeaaaccceee");
  });
});
