
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
    photo: string;
    username: string;
    last_active_at: number;
    last_sign_in_at: number;
}