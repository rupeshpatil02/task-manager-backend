
export interface Signup {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface Login{
    loginIdentifier:string;
    password :string;

}

export interface ForgotPassword{
    email:string;
}
export interface ResetPassword{
    email:string;
    otp:string;
    newPassword:string;

}