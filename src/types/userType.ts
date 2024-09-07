import { EUserRole } from '../constant/userConstant';

export interface IRegisterRequestBody {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    consent: boolean;
}
export interface IUser {
    name: string;
    email: string;
    phoneNumber: {
        isoCode: string;
        countryCode: string;
        internationalNumber: string;
    };
    password: string;
    timeZone: string;
    role: EUserRole;
    accountConformation: {
        status: boolean;
        token: string;
        code: string;
        timestamp: string;
    }
    passwordReset: {
        token: string | null;
        expiry: number | null;
        lastReset: Date | null;
    }
    lastLogin: Date | null;
    consent: boolean;
}