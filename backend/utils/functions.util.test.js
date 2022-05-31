const functions = require("./functions.util");

test("Testing Find By Id function with incorrect id", () => {
  const id = 55415465565656;
  expect(functions.findUserById(id)).rejects.not.toBe({});
});

test("Testing Find User function with incorrect input ", () => {
  const id = 55415465565656;
  expect(functions.findUser(id)).rejects.not.toBe({});
});

test("Testing Get Verify Token with incorrect id ", () => {
  const id = 55415465565656;
  expect(functions.getVerifyToken(id)).rejects.not.toEqual(expect.any(Number));
});

test("Testing Find User function with incorrect input ", () => {
  const id = "";
  expect(functions.removeCookie(id)).rejects.toThrow();
});
