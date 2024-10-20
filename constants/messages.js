const SERVER_RUNNING = 'Servidor corriendo en el puerto';
const DB_ERROR = 'Error iniciando base de datos';
const EMAIL_REQUIRED = 'El email es obligatorio';
const INVALID_PASSWORD = 'El password debe tener 5 caracteres';
const NAME_REQUIRED = 'El nombre es obligatorio';
const LAST_NAME_REQUIRED = 'El apellido es obligatorio';
const NOT_FOUND_TOKEN = 'No hay token en la solicitud';
const INVALID_TOKEN = 'Token invalido';
const NOT_GENERATE_TOKEN = 'Error generando token';
const EXISTING_USER = 'El usuario ya existe';
const USER_EMAIL_NO_EXIST = 'El usuario con el email dado no existen';
const CREATE_USER_ERROR = 'Error al intentar crear el usuario';
const LOGIN_ERROR = 'Error al intentar ingresar';
const PASS_INCORRECT = 'Clave invalida';
const CUSTOMER_EXIST = 'El cliente ya existe';
const CUSTOMER_NO_EXIST = 'El cliente no existe';
const CUSTOMER_ERROR = 'Error al intentar crear el cliente';
const CUSTOMER_LIST_ERROR = 'Error al intentar consultar los clientes';
const PHONE_ERROR = 'El formato debe ser ###-#######';
const IDENTIFICATION_ERROR = 'Debe tener minimo 8 digitos';
const ADDRESS_REQUIRED = 'La direccion es obligatorio';
const STATUS_REQUIRED = 'El estado es obligatorio';
const MANAGEDBY_REQUIRED = 'Quien maneja el cliente es obligatorio';
const TRUE = true;
const FALSE = false;
const STATUS_400 = 400;
const STATUS_200 = 200;
const STATUS_500 = 500;


module.exports = {
    SERVER_RUNNING,
    DB_ERROR,
    EMAIL_REQUIRED,
    INVALID_PASSWORD,
    NAME_REQUIRED,
    NOT_FOUND_TOKEN,
    INVALID_TOKEN,
    NOT_GENERATE_TOKEN,
    EXISTING_USER,
    CREATE_USER_ERROR,
    USER_EMAIL_NO_EXIST,
    PASS_INCORRECT,
    LOGIN_ERROR,
    TRUE,
    FALSE,
    STATUS_400,
    STATUS_200,
    STATUS_500,
    CUSTOMER_EXIST,
    CUSTOMER_ERROR,
    LAST_NAME_REQUIRED,
    IDENTIFICATION_ERROR,
    ADDRESS_REQUIRED,
    PHONE_ERROR,
    STATUS_REQUIRED,
    MANAGEDBY_REQUIRED,
    CUSTOMER_LIST_ERROR,
    CUSTOMER_NO_EXIST
};