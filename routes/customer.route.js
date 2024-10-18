const {Router} = require('express');
const {check} = require('express-validator');
const {validateField} = require('../middlewares/checkFields');
const ControllerCustomer = require('../controllers/customer.controller');
const route = require('../constants/routes');
const field = require('../constants/fields');
const message = require('../constants/messages');

const router = Router();

router.post(route.CREAR_CUSTOMER, [ 
        check(field.NAME, message.NAME_REQUIRED).not().isEmpty(),
        check(field.LASTNAME, message.NAME_REQUIRED).not().isEmpty(),
        check(field.IDENTIFICATION, message.INVALID_PASSWORD).isLength({ min: 8 }),
        check(field.ADDRESS, message.NAME_REQUIRED).not().isEmpty(),
        check(field.PHONE, message.NAME_REQUIRED).not().isEmpty().matches(/^\d{3}-\d{7}$/),
        check(field.PHONE2, message.NAME_REQUIRED).not().isEmpty().matches(/^\d{3}-\d{7}$/),
        check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
        check(field.STATUS, message.NAME_REQUIRED).not().isEmpty().isIn(['ACTIVO', 'INACTIVO']),
        check(field.MANAGEDBY, message.INVALID_PASSWORD).not().isEmpty(),,
        validateField
], ControllerCustomer.createCustomer);


module.exports = router;