const Staff = require("./staff.model");

test("add new incomplete Staff data (passwordHash) to the database", async () => {
  const incompleteData = new Staff({
    name: "test",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    mobile: "0111206597",
    nic: "200265988799",
    email: "test@gmail.com",
    verified: true,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.passwordHash).toBeDefined();
  }
});
