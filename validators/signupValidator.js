const { check } = require("express-validator");

exports.signupValidation = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  check("email").isEmail().withMessage("err: Must be a proper Email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("err: Must be atleast 6 chr long"),
];

exports.signinValidation = [
  check("email").isEmail().withMessage("err: Must be a proper Email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("err: Must be atleast 6 chr long"),
];
