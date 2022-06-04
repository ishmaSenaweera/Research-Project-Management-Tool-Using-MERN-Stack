const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

/* A schema for validating the student registration form. */
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

/* A schema for validating the student update form. */
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

/* This is a schema for validating the admin registration form. */
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

/* A schema for validating the admin update form. */
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

/* This is a schema for validating the staff registration form. */
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

/* A schema for validating the staff update form. */
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

/* This is a schema for validating the login form. */
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

/* This is a schema for validating the change password form. */
const changePasswordSchema = Joi.object({
  password: passwordComplexity().required().label("Password"),
  newPassword: passwordComplexity().required().label("New Password"),
  newPasswordVerify: passwordComplexity()
    .valid(Joi.ref("newPassword"))
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
