const Student = require("./student.model");

test("add new incomplete Student data (specialization) to the database", async () => {
  const incompleteData = new Student({
    name: "test",
    sid: "IT12345678",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    batch: "Weekend",
    branch: "Metro",
    mobile: "0111206597",
    nic: "200265988799",
    email: "test@gmail.com",
    passwordHash: "kkdb5d564#$#$wd6s5dfsd5csdcsdfs",
    verified: true,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.specialization).toBeDefined();
  }
});
