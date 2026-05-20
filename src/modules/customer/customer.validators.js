const { check } = require('express-validator');
const field = require('../../constants/fields');
const message = require('../../constants/messages');

const customerValidators = [
  check(field.NAME, message.NAME_REQUIRED).not().isEmpty(),
  check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
];

module.exports = { customerValidators };
