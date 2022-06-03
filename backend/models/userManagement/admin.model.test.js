const Admin = require("./admin.model");

test("add new incomplete Admin data (dob) to the database", async () => {
  const incompleteData = new Admin({
    name: "test",
    gender: "male",
    mobile: "0111206597",
    nic: "200265988799",
    email: "test@gmail.com",
    passwordHash: "kkdb5d564#$#$wd6s5dfsd5csdcsdfs",
    verified: true,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.dob).toBeDefined();
  }
});
