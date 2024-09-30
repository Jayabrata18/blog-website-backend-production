/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import apiController from '../controller/apiController';
import rateLimit from '../middleware/rateLimit';
import blogController from '../controller/blogController';

const router = Router();
router.use(rateLimit);
router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)
// router.route('/register').post(apiController.register)
router.route('/create-blog').post(blogController.createBlog)
router.route('/get-blog/:_id').get(blogController.getByIdBlog)
router.route('/get-blogs').get(blogController.getAllBlogs)
router.route('/update-blog/:_id').put(blogController.updateABlog)
router.route('/delete-blog/:_id').delete(blogController.deleteABlog)
router.route('/:_id/like-blog').patch(blogController.patch)


export default router;