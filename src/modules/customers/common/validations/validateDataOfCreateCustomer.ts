import { Joi } from 'celebrate';

export const validateDataOfCreateCustomer = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
};

export default validateDataOfCreateCustomer;
