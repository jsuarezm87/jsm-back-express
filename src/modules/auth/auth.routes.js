const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../../shared/middlewares/validateFields.middleware');
const ControllerAuth = require('./auth.controller');
const { checkJWT } = require('../../shared/middlewares/authJwt.middleware');
const route = require('../../constants/routes');
const field = require('../../constants/fields');
const message = require('../../constants/messages');

const router = Router();

router.post(route.LOGIN, [
    check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
    check(field.PASSWORD, message.INVALID_PASSWORD).isLength({ min: 5 }),
    validateField
], ControllerAuth.loginUser);

router.post(route.CREAR, [
    check(field.NAME, message.NAME_REQUIRED).not().isEmpty(),
    check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
    check(field.PASSWORD, message.INVALID_PASSWORD).isLength({ min: 5 }),
    validateField
], ControllerAuth.createUser);

router.get(route.VAL_TOKEN, checkJWT, ControllerAuth.validJWT);

module.exports = router;
