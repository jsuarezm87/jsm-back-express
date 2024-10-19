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
        check(field.LASTNAME, message.LAST_NAME_REQUIRED).not().isEmpty(),
        check(field.IDENTIFICATION, message.IDENTIFICATION_ERROR).isLength({ min: 8 }),
        check(field.ADDRESS, message.ADDRESS_REQUIRED).not().isEmpty(),
        check(field.PHONE, message.PHONE_ERROR).not().isEmpty().matches(/^\d{3}-\d{7}$/),
        check(field.PHONE2, message.PHONE_ERROR).not().isEmpty().matches(/^\d{3}-\d{7}$/),
        check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
        check(field.STATUS, message.STATUS_REQUIRED).not().isEmpty().isIn(['ACTIVO', 'INACTIVO']),
        check(field.MANAGEDBY, message.MANAGEDBY_REQUIRED).not().isEmpty(),
        validateField
], ControllerCustomer.createCustomer);

router.get(route.LIST_CUSTOMER, ControllerCustomer.listCustomer);



module.exports = router;