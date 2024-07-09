import Joi from 'joi';
import { ForgotPassword, Login, ResetPassword, Signup } from '../interfaces/user.interface';


export const userSignup = Joi.object<Signup>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const userLogin = Joi.object<Login>({
    loginIdentifier: Joi.string().required(),
    password: Joi.string().required()
})

export const getOTP = Joi.object<ForgotPassword>({
    email: Joi.string().email().required()
})

export const forgotPassword = Joi.object<ResetPassword>({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    newPassword: Joi.string().required()
})