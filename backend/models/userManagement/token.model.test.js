const Token = require("./token.model");

test("add new incomplete Token data (userID) to the database", async () => {
  const incompleteData = new Token({
    token: "6rtygrty6655yegvyrtyhr4ghvr655645vrg4rg",
    createdAt: "2001-01-01 00:00:00",
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.userID).toBeDefined();
  }
});
