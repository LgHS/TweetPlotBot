const splitMessage = require("../src/splitMessage");

const expect = require("chai").expect;

describe("splitMessage", function() {
  it("splits message string into array with correct length and values", function() {
    const message = splitMessage({
      message: "Hello world",
      lineLength: 10
    });

    expect(message).to.deep.equal(["Hello worl", "d"]);
  });

  it("doesn't split message when message is smaller then given line length", function() {
    const message = splitMessage({
      message: "Hello world",
      lineLength: 20
    });

    expect(message).to.equal("Hello world");
  });
});
