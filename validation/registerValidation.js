const {Joi} = require('express-validation');

RegisterValidation = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(3).max(40).email().required(),
    password: Joi.string().min(6).max(32).required(),
    confirm_password: Joi.string().min(6).max(32).required(),
    role: Joi.string().min(3).max(20).required()
});

module.exports = RegisterValidation;