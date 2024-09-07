import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';
import quicker from '../utils/quicker';
import { IRegisterRequestBody } from '../types/userType';
import { validateJoiSchema, validateRegisterBody } from '../service/validationService';
import databaseService from '../service/databaseService';

interface IRegisterRequest extends Request {
    body: IRegisterRequestBody;
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

            //body validation
            const { error, value } = validateJoiSchema<IRegisterRequestBody>(validateRegisterBody, body);
            if (error) {
                return httpError(next, error, req, 422)
            }
            const { email, password } = value
            //check existing user
            const user = await databaseService.findUserByEmail(email);
            if (user) {
                return httpError(next, new Error(responseMessage.ALREADY_EXIST('user', email)), req, 422)
            }

            //hash password
            const hashedPassword = await quicker.hashPassword(password);

            


            //Account confirmation
            //create user
            //send email
            httpResponse(req, res, 201, responseMessage.SUCCESS, {});
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
}