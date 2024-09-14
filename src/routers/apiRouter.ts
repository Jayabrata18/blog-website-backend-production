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
router.route('/create-blog').post(blogController.create)
router.route('/get-blog/:_id').get(blogController.getById)
router.route('/get-blogs').get(blogController.getAll)
router.route('/update-blog/:_id').put(blogController.update)
router.route('/delete-blog/:_id').delete(blogController.delete)


export default router;