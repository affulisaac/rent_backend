const Joi = require('joi');

const businessSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.allow()
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  nationality: Joi.string().required(),
  national_id: Joi.allow(),
  contact_number: Joi.string(),
  alternative_number: Joi.allow(),
  password: Joi.required(),
  alternative_contact: Joi.allow(),
  address: Joi.required(),
  repeat_password: Joi.allow(),

});


const propertySchema = Joi.object({
    location: Joi.string().required(),
    name: Joi.string().required(),
    gpgps: Joi.string().required(),
    rooms: Joi.array().required(),
    remarks: Joi.allow(),
    description: Joi.string().required(),
  });

  const tenantSchema = Joi.object({
    location: Joi.string().email().required(),
    nationality: Joi.string().required(),
    contact_number: Joi.string().required(),
    email: Joi.string().email().required(),
    national_id: Joi.string().required(),
    occupation: Joi.string().required(),
    emergency_contact: Joi.string().required(),
    emergency_contact_name: Joi.string().required(),
    rent_start_date: Joi.string().required(),
    rent_end_date: Joi.string().required(),
    amount_per_month: Joi.string().required(),
    appartment_number: Joi.string().required(),
  });
  

module.exports = { businessSchema, propertySchema, tenantSchema, userSchema }