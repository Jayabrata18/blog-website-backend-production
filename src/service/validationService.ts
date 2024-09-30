import joi from 'joi'
import { IRegisterRequestBody } from '../types/userType'
import {  IBlog, IComment } from '../types/blogType'

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
    image_url: joi.string().uri().required(),
    // author_Name: joi.string().min(3).max(255).trim().required(),
    // isPublic: joi.boolean().default(true),
    // totalLikes: joi.number().min(0).default(15),
    // totalComments: joi.number().min(0).default(2),
    // comments: joi.array().items(joi.object().optional()),  // Nested comments will be validated separately
    // tags: joi.array().items(joi.string()).optional(),
    // categories: joi.array().items(joi.string()).optional(),
    // slug: joi.string().min(2).max(255).optional(),
    // readingTime: joi.string().optional(),
    // metaDescription: joi.string().optional(),
    // isFeatured: joi.boolean().default(false),
    // views: joi.number().min(0).default(0),
});


export const validateComment = joi.object<IComment>({
    userEmail: joi.string().email().required(),
    userName: joi.string().min(3).max(255).trim().required(),
    commentMessage: joi.string().min(1).max(10000).trim().required(),
    likes: joi.number().min(0).default(0),
});


export const validateJoiSchema = <T>(schema: joi.ObjectSchema, value: unknown) => {
    const result = schema.validate(value)

    return {
        value: result.value as T,
        error: result.error
    }


}