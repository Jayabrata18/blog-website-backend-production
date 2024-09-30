import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';
import quicker from '../utils/quicker';
import { IUser } from '../types/userType';
// import { validateJoiSchema, validateRegisterBody } from '../service/validationService';
import databaseService from '../service/databaseService';

interface IRegisterRequest extends Request {
    body: IUser;
}
export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            // res.sendStatus(200);
            httpResponse(req, res, 200, responseMessage.SUCCESS, {});
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timeStamp: Date.now()
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IRegisterRequest;
            // validation
            // const { error, value } = validateJoiSchema<IUser>(validateRegisterBody, body);
            // if (error) {
            //     return httpError(next, error, req, 422)
            // }
            // const { name, email, phoneNumber, password, consent } = value
            // save to db
            // const payload: IUser = { name, email, phoneNumber, password, consent }
            const newUser = await databaseService.registerUser(body);
            // response
            res.send(newUser);
            httpResponse(req, res, 201, responseMessage.SUCCESS, { _id: newUser._id });
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
}