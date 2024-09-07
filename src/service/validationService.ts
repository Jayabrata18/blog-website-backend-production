import joi from 'joi'
import { IRegisterRequestBody } from '../types/userType'

export const validateRegisterBody = joi.object<IRegisterRequestBody>({
    name: joi.string().min(2).max(72).trim().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().min(10).max(14).required(),
    password: joi.string().required().trim(), //regex
    consent: joi.boolean().required().valid(true)
})

export const validateJoiSchema = <T>(schema: joi.ObjectSchema, value: unknown) => {
    const result = schema.validate(value)

    return {
        value: result.value as T,
        error: result.error
    }


}