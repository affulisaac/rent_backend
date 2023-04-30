const Joi = require("joi");

const  validateParams  = (schema) => {
  return function (req, res, next) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json({errors: error.details});
    }
    next();
  };
}

module.exports = {validateParams}