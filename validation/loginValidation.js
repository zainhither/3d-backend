const {Joi} = require('express-validation');

LoginValidation = Joi.object({
    email: Joi.string().min(3).max(40).email().required(),
    password: Joi.string().min(6).max(32).required(),
});

module.exports = LoginValidation;