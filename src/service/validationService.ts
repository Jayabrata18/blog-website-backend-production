import joi from 'joi'
import { IRegisterRequestBody } from '../types/userType'
import { IBlog } from '../types/blogType'

export const validateRegisterBody = joi.object<IRegisterRequestBody>({
    name: joi.string().min(2).max(72).trim().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().min(10).max(14).required(),
    password: joi.string().required().trim(), //regex
    consent: joi.boolean().required().valid(true)
})
export const validateBlog = joi.object<IBlog>({
    title: joi.string().min(2).max(72).trim().required(),
    content: joi.string().min(5).max(500000).trim().required(),
    image_url: joi.string().required()
}

)

export const validateJoiSchema = <T>(schema: joi.ObjectSchema, value: unknown) => {
    const result = schema.validate(value)

    return {
        value: result.value as T,
        error: result.error
    }


}