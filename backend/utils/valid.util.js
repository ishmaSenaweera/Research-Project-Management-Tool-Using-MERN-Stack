const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studentSchemaRegister = Joi.object({
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

const studentSchemaUpdate = Joi.object({
  id: Joi.string().required().label("id"),
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
});

module.exports = {
  studentSchemaRegister,
  studentSchemaUpdate,
};
