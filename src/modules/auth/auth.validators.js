const { check } = require('express-validator');
const field = require('../../../constants/fields');
const message = require('../../../constants/messages');

const authValidators = [
  check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
  check(field.PASSWORD, message.INVALID_PASSWORD).isLength({ min: 5 }),
];

module.exports = { authValidators };
