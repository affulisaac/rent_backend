const { string } = require("joi");
const Joi = require("joi");

const businessSchema = Joi.object({
  _id: Joi.allow(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.allow(),
});

const paymentSchema = Joi.object({
  _id: Joi.allow(),
  amount: Joi.number().required(),
  date: Joi.string().required(),
  tenant: Joi.string().required(),
  type: Joi.string().required(),
  rent: Joi.string().required(),
  method: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.allow(),
});

const propertySchema = Joi.object({
  _id: Joi.allow(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  gpgps: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.allow(),
});

const userSchema = Joi.object({
  _id: Joi.allow(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  nationality: Joi.string().required(),
  national_id: Joi.allow(),
  contact_number: Joi.string(),
  alternative_number: Joi.allow(),
  password: Joi.required(),
  user: Joi.allow(),
  alternative_contact: Joi.allow(),
  address: Joi.required(),
  repeat_password: Joi.allow(),
  user: Joi.allow(),
});

const userUpdateSchema = Joi.object({
  _id: Joi.allow(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  nationality: Joi.string().required(),
  national_id: Joi.allow(),
  user: Joi.allow(),
  contact_number: Joi.string(),
  alternative_number: Joi.allow(),
  alternative_contact: Joi.allow(),
  address: Joi.required(),
  user: Joi.allow(),
});

const apartmentSchema = Joi.object({
  _id: Joi.allow(),
  name: Joi.string().required(),
  rooms: Joi.array().required(),
  remarks: Joi.allow(),
  property: Joi.allow(),
  description: Joi.string().required(),
  user: Joi.allow(),
});

const SMSSchema = Joi.object({
  type: Joi.string().required(),
  user: Joi.allow(),
});

const tenantSchema = Joi.object({
  nationality: Joi.string().required(),
  name: Joi.string().required(),
  national_id: Joi.string().required(),
  contact_number: Joi.string().required(),
  email: Joi.string().email().required(),
  national_id: Joi.string().required(),
  occupation: Joi.string().required(),
  emergency_contact: Joi.string().required(),
  emergency_contact_name: Joi.string().required(),
  _id: Joi.allow(),
  user: Joi.allow(),
});

const rentSchema = Joi.object({
  rent_start_date: Joi.string().required(),
  number_of_month: Joi.number().required(),
  rent_end_date: Joi.string().required(),
  amount_per_month: Joi.string().required(),
  apartment: Joi.string().required(),
  total_amount: Joi.number().required(),
  rooms: Joi.array(),
  tenant: Joi.string().allow(),
  remarks: Joi.string().allow(),
  _id: Joi.allow(),
  user: Joi.allow(),
});

module.exports = {
  businessSchema,
  SMSSchema,
  rentSchema,
  apartmentSchema,
  tenantSchema,
  userSchema,
  userUpdateSchema,
  propertySchema,
  paymentSchema,
};
