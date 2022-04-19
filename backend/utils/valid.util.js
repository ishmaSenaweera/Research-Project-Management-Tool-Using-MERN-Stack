const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// validate student registration
const studentRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("name"),
  dob: Joi.string().required().label("dob"),
  gender: Joi.string().valid("male", "female").required().label("gender"),
  specialization: Joi.string().required().label("specialization"),
  batch: Joi.string().min(2).max(15).required().label("batch"),
  branch: Joi.string().min(2).max(15).required().label("branch"),
  mobile: Joi.string().length(10).required().label("mobile"),
  nic: Joi.string().length(11).required().label("nic"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
  password: passwordComplexity().required().label("password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("passwordVerify"),
});

// validate student update
const studentUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("name"),
  dob: Joi.string().required().label("dob"),
  gender: Joi.string().valid("male", "female").required().label("gender"),
  specialization: Joi.string().required().label("specialization"),
  batch: Joi.string().min(2).max(15).required().label("batch"),
  branch: Joi.string().min(2).max(15).required().label("branch"),
  mobile: Joi.string().length(10).required().label("mobile"),
  nic: Joi.string().length(11).required().label("nic"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
}).unknown(true);

// validate admin registration
const adminRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("name"),
  dob: Joi.string().required().label("dob"),
  gender: Joi.string().valid("male", "female").required().label("gender"),
  mobile: Joi.string().length(10).required().label("mobile"),
  nic: Joi.string().length(11).required().label("nic"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
  password: passwordComplexity().required().label("password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("passwordVerify"),
}).unknown(true);

// validate admin update
const adminUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("name"),
  dob: Joi.string().required().label("dob"),
  gender: Joi.string().valid("male", "female").required().label("gender"),
  mobile: Joi.string().length(10).required().label("mobile"),
  nic: Joi.string().length(11).required().label("nic"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
}).unknown(true);

// validate staff registration
const staffRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("name"),
  dob: Joi.date().required().label("dob"),
  gender: Joi.string().valid("male", "female").required().label("gender"),
  type: Joi.string()
    .valid("supervisor", "coSupervisor", "panelMember")
    .required()
    .label("type"),
  mobile: Joi.string().length(10).required().label("mobile"),
  nic: Joi.string().length(11).required().label("nic"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
  password: passwordComplexity().required().label("password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("passwordVerify"),
}).unknown(true);

// validate staff update
const staffUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("name"),
  dob: Joi.date().required().label("dob"),
  gender: Joi.string().valid("male", "female").required().label("gender"),
  type: Joi.string()
    .valid("supervisor", "coSupervisor", "panelMember")
    .required()
    .label("type"),
  mobile: Joi.string().length(10).required().label("mobile"),
  nic: Joi.string().length(11).required().label("nic"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
}).unknown(true);

// validate login
const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("email"),
  password: passwordComplexity().required().label("password"),
});

// validate change password
const changePasswordSchema = Joi.object({
  password: passwordComplexity().required().label("password"),
  newpassword: passwordComplexity().required().label("newpassword"),
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
