import Joi from "joi";
import { AddressType, EmploymentStatus, Gender, MaritalStatus, RelationType, StaffType } from "~/@types/member.dto";

export const addMemberSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required(),
  middle_name: Joi.string().trim().max(50).allow(''),
  last_name: Joi.string().trim().min(2).max(50).required(),
  guardian: Joi.string().trim().min(2).max(100).required(),
  relation_with_guardian: Joi.string().valid(...Object.values(RelationType)).required(),
  date_of_birth: Joi.date().max('now').required(),
  gender: Joi.string().valid(...Object.values(Gender)).required(),
  marital_status: Joi.string().valid(...Object.values(MaritalStatus)).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  mobile: Joi.string().pattern(/^\d{10}$/).required(),
  alternate_number: Joi.string().pattern(/^\d{10}$/).allow(''),
  department: Joi.string().trim().min(2).max(50).required(),
  staff_type: Joi.string().valid(...Object.values(StaffType)).required(),
  income: Joi.number().min(0).max(999999999).required(),
  employment_status: Joi.string().valid(...Object.values(EmploymentStatus)).required(),
  addresses: Joi.array().items(Joi.object({
    address_type: Joi.string().valid(...Object.values(AddressType)).required(),
    line1: Joi.string().trim().min(2).max(100).required(),
    line2: Joi.string().trim().max(100).allow(''),
    city: Joi.string().trim().min(2).max(50).required(),
    state: Joi.string().trim().min(2).max(50).required(),
    country: Joi.string().trim().min(2).max(50).required(),
    postal_code: Joi.string().pattern(/^\d{6}$/).required()
  })).min(2).required(),
});
