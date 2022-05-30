const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// validate student registration
const studentRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  sid: Joi.string().length(10).required().label("Student ID"),
  dob: Joi.string().required().label("DoB"),
  gender: Joi.string().valid("male", "female").required().label("Gender"),
  specialization: Joi.string().required().label("Specialization"),
  batch: Joi.string().min(2).max(15).required().label("Batch"),
  branch: Joi.string().min(2).max(15).required().label("Branch"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  nic: Joi.string().length(11).required().label("NIC"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: passwordComplexity().required().label("Password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("Password Verify"),
});

// validate student update
const studentUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  sid: Joi.string().length(10).required().label("Student ID"),
  dob: Joi.string().required().label("DoB"),
  gender: Joi.string().valid("male", "female").required().label("Gender"),
  specialization: Joi.string().required().label("Specialization"),
  batch: Joi.string().min(2).max(15).required().label("Batch"),
  branch: Joi.string().min(2).max(15).required().label("Branch"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  nic: Joi.string().length(11).required().label("NIC"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
}).unknown(true);

// validate admin registration
const adminRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  dob: Joi.string().required().label("DoB"),
  gender: Joi.string().valid("male", "female").required().label("Gender"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  nic: Joi.string().length(11).required().label("NIC"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: passwordComplexity().required().label("Password"),
  passwordVerify: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Password Verify"),
}).unknown(true);

// validate admin update
const adminUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  dob: Joi.string().required().label("DoB"),
  gender: Joi.string().valid("male", "female").required().label("Gender"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  nic: Joi.string().length(11).required().label("NIC"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
}).unknown(true);

// validate staff registration
const staffRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  dob: Joi.date().required().label("DoB"),
  gender: Joi.string().valid("male", "female").required().label("Gender"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  nic: Joi.string().length(11).required().label("NIC"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: passwordComplexity().required().label("Password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("Password Verify"),
}).unknown(true);

// validate staff update
const staffUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  dob: Joi.date().required().label("DoB"),
  gender: Joi.string().valid("male", "female").required().label("Gender"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  nic: Joi.string().length(11).required().label("NIC"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
}).unknown(true);

// validate login
const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: passwordComplexity().required().label("Password"),
});

// validate change password
const changePasswordSchema = Joi.object({
  password: passwordComplexity().required().label("Password"),
  newPassword: passwordComplexity().required().label("New Password"),
  newPasswordVerify: passwordComplexity()
    .valid(Joi.ref("New Password"))
    .required()
    .label("New Password Verify"),
}).unknown(true);

module.exports = {
  studentRegisterSchema,
  studentUpdateSchema,
  adminRegisterSchema,
  adminUpdateSchema,
  staffRegisterSchema,
  staffUpdateSchema,
  loginSchema,
  changePasswordSchema,
};
