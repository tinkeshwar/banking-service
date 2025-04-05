import Joi from 'joi';
import { AccountType, PaymentMode } from '~/@types/account.dto';

export const createAccountSchema = Joi.object({
    member_id: Joi.number().required(),
    account_type: Joi.string().valid(...Object.values(AccountType)).required(),
    details: Joi.object({
        principal_amount: Joi.number().allow(null).optional(),
        installments: Joi.number().allow(null).optional(), 
        payment_mode: Joi.string().valid(...Object.values(PaymentMode)).required(),
        payment_receipt: Joi.string().allow(null).optional()    
    }).when('account_type', {
        is: [AccountType.LOAN, AccountType.FIXED, AccountType.RECURRING],
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    verification: Joi.object({
        aadhaar_card: Joi.string().allow(null).optional(),
        pan_card: Joi.string().allow(null).optional(),
        first_guarantor_id: Joi.number().allow(null).when('account_type', {
            is: AccountType.LOAN,
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
        second_guarantor_id: Joi.number().allow(null).when('account_type', {
            is: AccountType.LOAN,
            then: Joi.required(), 
            otherwise: Joi.optional()
        }),    
    }),
    nominees: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            relation: Joi.string().required(),
            date_of_birth: Joi.date().required(),
            mobile: Joi.string().required(),
            share: Joi.number().min(0).max(100).required()
        })
    ).min(1).custom((value, helpers) => {
        const totalShare = value.reduce((sum: number, nominee: { share: number; }) => sum + nominee.share, 0);
        if (totalShare !== 100) return helpers.error('InvalidTotalShareDistribution');
        return value;
    }).when('account_type', {
        is: AccountType.LOAN,
        then: Joi.optional(),
        otherwise: Joi.required()
    })
});