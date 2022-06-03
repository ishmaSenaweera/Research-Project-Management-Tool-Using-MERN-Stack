const functions = require("./functions.util");

test("Testing Find By Id function with incorrect id", async () => {
  const id = "fhfghghghfghg";
  try {
    await functions.findUserById(id);
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

// ────────────────────────────────────────────────────────────────────────────────

test("Testing Find User function with incorrect input", async () => {
  const input = "india";
  try {
    await functions.findUser(input);
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

// ────────────────────────────────────────────────────────────────────────────────

test("Testing Get Verify Token with empty id", async () => {
  const id = "";
  try {
    await functions.getVerifyToken(id);
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

// ────────────────────────────────────────────────────────────────────────────────

test("Testing Remove Cookie function with incorrect input", async () => {
  const id = "ghfghfghgfhg";
  try {
    await functions.removeCookie(id);
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});
