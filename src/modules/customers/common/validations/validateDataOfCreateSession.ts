import { Joi } from 'celebrate';

export const validateDataOfCreateSession = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export default validateDataOfCreateSession;
