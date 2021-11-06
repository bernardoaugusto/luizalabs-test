import { Joi } from 'celebrate';

export const validateDataOfUpdateCustomer = {
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
};

export default validateDataOfUpdateCustomer;
