import Joi from "joi";

export const addMemberSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name cannot be empty',
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name cannot exceed 50 characters'
  }),
  middle_name: Joi.string().trim().max(50).allow(''),
  last_name: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters', 
    'string.max': 'Last name cannot exceed 50 characters'
  }),
  guardian: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Guardian name is required',
    'string.min': 'Guardian name must be at least 2 characters',
    'string.max': 'Guardian name cannot exceed 100 characters'
  }),
  relation_with_guardian: Joi.string().valid('Father', 'Mother', 'Spouse').required().messages({
    'any.required': 'Relation is required',
    'any.only': 'Relation must be Father, Mother or Spouse'
  }),
  date_of_birth: Joi.date().max('now').required().messages({
    'any.required': 'Date of birth is required',
    'date.base': 'Please enter a valid date',
    'date.max': 'Date of birth cannot be in the future'
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Gender must be Male, Female or Other'
  }),
  marital_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').required().messages({
    'any.required': 'Marital status is required',
    'any.only': 'Invalid marital status selected'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'any.required': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
    'any.required': 'Mobile number is required',
    'string.pattern.base': 'Mobile number must be exactly 10 digits'
  }),
  alternate_number: Joi.string().pattern(/^\d{10}$/).allow('').messages({
    'string.pattern.base': 'Alternate number must be exactly 10 digits'
  }),
  department: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'Department is required',
    'string.min': 'Department must be at least 2 characters',
    'string.max': 'Department cannot exceed 50 characters'
  }),
  staff_type: Joi.string().valid('Superior', 'Clerk', 'Contract').required().messages({
    'any.required': 'Staff type is required',
    'any.only': 'Invalid staff type selected'
  }),
  income: Joi.number().min(0).max(999999999).required().messages({
    'any.required': 'Income is required',
    'number.base': 'Income must be a number',
    'number.min': 'Income cannot be negative',
    'number.max': 'Income value is too large'
  }),
  employment_status: Joi.string().valid('Active', 'Retired', 'Resigned', 'Terminated').required().messages({
    'any.required': 'Employment status is required',
    'any.only': 'Invalid employment status selected'
  }),
  addresses: Joi.array().items(Joi.object({
    address_type: Joi.string().valid('Local', 'Permanent').required().messages({
      'any.required': 'Address type is required',
      'any.only': 'Invalid address type selected'
    }),
    line1: Joi.string().trim().min(2).max(100).required().messages({
      'any.required': 'Address line 1 is required',
      'string.min': 'Address line 1 must be at least 2 characters',
      'string.max': 'Address line 1 cannot exceed 100 characters'
    }),
    line2: Joi.string().trim().max(100).allow(''),
    city: Joi.string().trim().min(2).max(50).required().messages({
      'any.required': 'City is required',
      'string.min': 'City must be at least 2 characters',
      'string.max': 'City cannot exceed 50 characters'
    }),
    state: Joi.string().trim().min(2).max(50).required().messages({
      'any.required': 'State is required',
      'string.min': 'State must be at least 2 characters',
      'string.max': 'State cannot exceed 50 characters'
    }),
    country: Joi.string().trim().min(2).max(50).required().messages({
      'any.required': 'Country is required',
      'string.min': 'Country must be at least 2 characters',
      'string.max': 'Country cannot exceed 50 characters'
    }),
    postal_code: Joi.string().pattern(/^\d{6}$/).required().messages({
      'any.required': 'Pincode is required',
      'string.pattern.base': 'Pincode must be exactly 6 digits'
    })
  })).min(2).required().messages({
    'array.min': 'Local and Permanent addresses are required',
    'any.required': 'Addresses are required'
  }),
});