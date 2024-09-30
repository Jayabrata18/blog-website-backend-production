
import { IBlog, IComment } from '../types/blogType';
import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';
import { validateBlog, validateJoiSchema } from '../service/validationService';
import databaseService from '../service/databaseService';


interface IBlogRequest extends Request {
    body: IBlog;
}
interface ICommentRequest extends Request {
    body: IComment;
}
export default {
    createBlog: async (req: Request, res: Response, next: NextFunction) => {
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
    getByIdBlog: async (req: Request, res: Response, next: NextFunction) => {
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
    getAllBlogs: async (req: Request, res: Response, next: NextFunction) => {
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
    updateABlog: async (req: Request, res: Response, next: NextFunction) => {
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
    deleteABlog: async (req: Request, res: Response, next: NextFunction) => {
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
    },
    // like a blog
    patch: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            const blog = await databaseService.getById(_id);
            if (!blog) {
                throw new Error(responseMessage.NOT_FOUND('blog'));
            }
            blog.totalLikes = (blog.totalLikes || 0) + 1;
            await databaseService.update(_id, blog);
            res.send(blog.totalLikes);
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    // comment on a blog
    postComment: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            const blog = await databaseService.getById(_id);
            if (!blog) {
                throw new Error(responseMessage.NOT_FOUND('blog'));
            }
            const { body } = req as ICommentRequest;
            const { error, value } = validateJoiSchema<IComment>(validateBlog, body);
            if (error) {
                return httpError(next, error, req, 422)
            }
            const { userEmail, userName, commentMessage } = value
            //save
            const payload: IComment = { userEmail, userName, commentMessage }
            const newComment = await databaseService.createComment(_id, payload);

            res.send(newComment);

            httpResponse(req, res, 201, responseMessage.SUCCESS, newComment);
        } catch (error) {
            httpError(next, error, req, 500);
        }

    },
    //     //update comment need to check
    //     updateAComment: async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const { _id, commentId } = req.params;
    //             const blog = await databaseService.getById(_id);
    //             if (!blog) {
    //                 throw new Error(responseMessage.NOT_FOUND('blog'));
    //             }
    //             if (!blog.comments) {
    //                 throw new Error(responseMessage.NOT_FOUND('comments'));
    //             }
    //             const comment = blog.comments.find(commentId);
    //             if (!comment) {
    //                 throw new Error(responseMessage.NOT_FOUND('comment'));
    //             }
    //             const { body } = req as ICommentRequest;
    //             const { error, value } = validateJoiSchema<IComment>(validateBlog, body);
    //             if (error) {
    //                 return httpError(next, error, req, 422)
    //             }
    //         } catch (error) {
    //             httpError(next, error, req, 500);
    //         }
    //     },
    //     // like a comment  need to check
    //     patchComment: async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const { _id, commentId } = req.params;
    //             const blog = await databaseService.getById(_id);
    //             if (!blog) {
    //                 throw new Error(responseMessage.NOT_FOUND('blog'));
    //             }
    //             if (!blog.comments) {
    //                 throw new Error(responseMessage.NOT_FOUND('comments'));
    //             }
    //             const comment = blog.comments.find(commentId);
    //             if (!comment) {
    //                 throw new Error(responseMessage.NOT_FOUND('comment'));
    //             }
    //             comment.likes = (comment.likes || 0) + 1;
    //             await databaseService.updateComment(_id, commentId, comment);
    //             res.send(comment.likes);
    //             httpResponse(req, res, 200, responseMessage.SUCCESS);
    //         } catch (error) {
    //             httpError(next, error, req, 500);
    //         }
    //     },
    //     // delete comment 
    //     deleteAComment: async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const { _id, commentId } = req.params;
    //             const blog = await databaseService.getById(_id);
    //             if (!blog) {
    //                 throw new Error(responseMessage.NOT_FOUND('blog'));
    //             }
    //             if (!blog.comments) {
    //                 throw new Error(responseMessage.NOT_FOUND('comments'));
    //             }
    //             const comment = blog.comments.find(commentId);
    //             if (!comment) {
    //                 throw new Error(responseMessage.NOT_FOUND('comment'));
    //             }
    //             await databaseService.deleteComment(_id, commentId);
    //             res.sendStatus(204);
    //             httpResponse(req, res, 200, responseMessage.SUCCESS);
    //         } catch (error) {
    //             httpError(next, error, req, 500);
    //         }
    //     },



}