
import { IBlog } from '../types/blogType';
import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';
import { validateBlog, validateJoiSchema } from '../service/validationService';
import databaseService from '../service/databaseService';


interface IBlogRequest extends Request {
    body: IBlog;
}
export default {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IBlogRequest;
            // validation
            const { error, value } = validateJoiSchema<IBlog>(validateBlog, body);
            if (error) {
                return httpError(next, error, req, 422)
            }
            const { title, content, image_url } = value
            // save to db
            const payload: IBlog = { title, content, image_url }
            const newBlog = await databaseService.createBlog(payload);
            // response
            res.send(newBlog);

            httpResponse(req, res, 201, responseMessage.SUCCESS, { _id: newBlog._id });
        } catch (error) {
            httpError(next, error, req, 500);
        }

    },
    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            const blog = await databaseService.getById(_id);
            if (!blog) {
                throw new Error(responseMessage.NOT_FOUND('blog'));
            }
            res.send(blog);
            httpResponse(req, res, 200, responseMessage.SUCCESS, blog);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const blogs = await databaseService.getAllBlogs();

            // Set the Cache-Control header to 'no-store'
            res.set('Cache-Control', 'no-store');
            res.status(200).send(blogs);
            httpResponse(req, res, 200, responseMessage.SUCCESS, blogs);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },


    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            const { body } = req as IBlogRequest;
            // validation
            const { error, value } = validateJoiSchema<IBlog>(validateBlog, body);
            if (error) {
                return httpError(next, error, req, 422)
            }
            const { title, content, image_url } = value
            // update db
            const updatedBlog = await databaseService.update(_id, { title, content, image_url });
            // response
            res.send(updatedBlog);
            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedBlog);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            // delete from db
            await databaseService.delete(_id);
            // response
            res.sendStatus(204);
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }

}