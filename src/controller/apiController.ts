import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';
import quicker from '../utils/quicker';
import { IRegisterRequestBody, IUser } from '../types/userType';
import { validateJoiSchema, validateRegisterBody } from '../service/validationService';
import databaseService from '../service/databaseService';
import { EUserRole } from '../constant/userConstant';

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
            const { email, password, consent, phoneNumber, name,  } = value
            //check existing user
            const user = await databaseService.findUserByEmail(email);
            if (user) {
                return httpError(next, new Error(responseMessage.ALREADY_EXIST('user', email)), req, 422)
            }

            //hash password
            const hashedPassword = await quicker.hashPassword(password);

            


            //Account confirmation
            const token = quicker.generateRandomId()
            const code = quicker.generateOtp(6)
            const payload: IUser = {
                name,
                email,
                phoneNumber,
                password: hashedPassword,
                role: EUserRole.USER,
                accountConformation: {
                    status: false,
                    token,
                    code,
                    timestamp: ''
                },
                passwordReset: {
                    token: null,
                    expiry: null,
                    lastReset: null
                },
                lastLogin: null,
                consent,
                timeZone: 'UTC'

            }
            //create user
            const newUser = await databaseService.registerUser(payload)
            //send email
            // const confirmationUrl = `${config.FRONTEND_URL}/conformation/${token}?code=${code}`
            // const to = {email}
            // const subject = 'Account Confirmation'
            // const body = `Please click the following link to confirm your account: ${confirmationUrl}`
            // await quicker.sendEmail(to, subject, body).catch((err) => {
            // logger.error('EMAIL_SERVICE', {
            //     meta: {
            //         error: err.message
            //     }
            // })}


            httpResponse(req, res, 201, responseMessage.SUCCESS, {_id: newUser._id});
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
}