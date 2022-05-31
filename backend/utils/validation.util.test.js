const validate = require("./validation.util");

//
// ─── TEST REGISTER VALIDATION ───────────────────────────────────────────────────
//

//Validate correct Student Data
test("Validate Resgister Student Data", () => {
  const data = {
    name: "Kamal Perera",
    sid: "it12345678",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    specialization: "Cyber security",
    batch: "Weekend",
    branch: "Metro",
    mobile: "0111206597",
    nic: "12345678912",
    email: "test@gmail.com",
    password: "Password1+",
    passwordVerify: "Password1+",
  };
  expect(validate.studentRegisterSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

//Validate Incomplete Student Data
test("Validate Resgister Incomplete Student Data", () => {
  const data = {
    name: "Kamal Perera",
    sid: "it1234578",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    specialization: "Cyber security",
    batch: "Weekend",
    branch: "Metro",
    mobile: "01112597",
    nic: "12345672",
    email: "testgmail.com",
    password: "Password1",
    passwordVerify: "Passw",
  };
  expect(
    validate.studentRegisterSchema.validateAsync(data)
  ).rejects.not.toEqual(data);
});

// ────────────────────────────────────────────────────────────────────────────────

//Validate correct Staff Data
test("Validate Resgister Staff Data", () => {
  const data = {
    name: "Kamal Perera",
    sid: "it12345678",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    specialization: "Cyber security",
    batch: "Weekend",
    branch: "Metro",
    mobile: "0111206597",
    nic: "12345678912",
    email: "test@gmail.com",
    password: "Password1+",
    passwordVerify: "Password1+",
  };
  expect(validate.studentRegisterSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

//Validate Incomplete Staff Data
test("Validate Resgister Incomplete Staff Data", () => {
  const data = {
    name: "Kamal Perera",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    mobile: "0111597",
    nic: "12345612",
    email: "testgmail.com",
    password: "Password1+",
  };
  expect(
    validate.studentRegisterSchema.validateAsync(data)
  ).rejects.not.toEqual(data);
});

// ────────────────────────────────────────────────────────────────────────────────

//Validate correct Admin Data
test("Validate Resgister Admin Data", () => {
  const data = {
    name: "Kamal Perera",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    mobile: "0111206597",
    nic: "12345678912",
    email: "test@gmail.com",
    password: "Password1+",
    passwordVerify: "Password1+",
  };
  expect(validate.adminRegisterSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

//Validate Incomplete Admin Data
test("Validate Resgister Incomplete Admin Data", () => {
  const data = {
    name: "Kamal Perera",
    dob: "2001-01-01 00:00:00",
    mobile: "0111206597",
    nic: "1234512",
    email: "testgmail.com",
    password: "Password1+",
    passwordVerify: "Password1+",
  };
  expect(validate.adminRegisterSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});

//
// ─── TEST UPDATE VALIDATION ───────────────────────────────────────────────────
//

//Validate correct Student Data
test("Validate Update Student Data", () => {
  const data = {
    name: "Kamal Perera",
    sid: "it12345678",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    specialization: "Cyber security",
    batch: "Weekend",
    branch: "Metro",
    mobile: "0111206597",
    nic: "12345678912",
    email: "test@gmail.com",
  };
  expect(validate.studentUpdateSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

//Validate Incomplete Student Data
test("Validate Update Incomplete Student Data", () => {
  const data = {
    name: "Kamal Perera",
    sid: "it1234578",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    batch: "Weekend",
    branch: "Metro",
    mobile: "01112597",
    nic: "12345672",
    email: "testgmail.com",
  };
  expect(validate.studentUpdateSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});

// ────────────────────────────────────────────────────────────────────────────────

//Validate correct Staff Data
test("Validate Update Staff Data", () => {
  const data = {
    name: "Kamal Perera",
    sid: "it12345678",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    specialization: "Cyber security",
    batch: "Weekend",
    branch: "Metro",
    mobile: "0111206597",
    nic: "12345678912",
    email: "test@gmail.com",
  };
  expect(validate.studentUpdateSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

//Validate Incomplete Staff Data
test("Validate Update Incomplete Staff Data", () => {
  const data = {
    name: "Kamal Perera",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    mobile: "0111597",
    nic: "12345612",
    email: "testgmail.com",
  };
  expect(validate.studentUpdateSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});

// ────────────────────────────────────────────────────────────────────────────────

//Validate correct Admin Data
test("Validate Update Admin Data", () => {
  const data = {
    name: "Kamal Perera",
    dob: "2001-01-01 00:00:00",
    gender: "male",
    mobile: "0111206597",
    nic: "12345678912",
    email: "test@gmail.com",
  };
  expect(validate.adminUpdateSchema.validateAsync(data)).resolves.toEqual(data);
});

//Validate Incomplete Admin Data
test("Validate Update Incomplete Admin Data", () => {
  const data = {
    name: "Kamal Perera",
    dob: "2001-01-01 00:00:00",
    mobile: "0111206597",
    nic: "1234512",
    email: "testgmail.com",
  };
  expect(validate.adminUpdateSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});