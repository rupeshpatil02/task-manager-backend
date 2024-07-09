// services/userService.ts
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { handleResponse, internalServerError } from '../helpers/responseFormate';
import { ResponseCodes } from '../utils/responseCodes';
import { ResponseMessages } from '../utils/responseMessages';
import { generateAccessToken, generateLongLivedAccessToken } from '../helpers/user.helper';
import { transporter } from '../configs/mail.otpGenerator';
import { generateRandomId } from '../utils/IdGenerators';
class UserService {
  public async createUser(firstName: string, lastName: string, username: string, email: string, password: string) {
    // Check if user already exists
    // Generate a unique task ID
    let userId = generateRandomId();

    // Ensure that the generated task ID is unique
    while (await User.exists({ userId })) {
        userId = generateRandomId();
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleResponse(ResponseCodes.userAlreadyExist, ResponseMessages.userAlredyExist)
    }
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return handleResponse(ResponseCodes.userAlreadyExist, ResponseMessages.userUsernameAlreadyExist);
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      userId,
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return handleResponse(ResponseCodes.success, ResponseMessages.userRegistered, newUser);
  }

  public async loginUser(loginIdentifier: string, password: string) {
    // Find the user by email or username
    const user = await User.findOne({ $or: [{ email: loginIdentifier }, { username: loginIdentifier }] });
    if (!user) {
      return handleResponse(ResponseCodes.notFound, ResponseMessages.userNotFound);
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleResponse(ResponseCodes.unauthorized, ResponseMessages.invalidPassword);
    }
    try {
      // Generate access token
      const accessToken = generateAccessToken(user._id);

      // Generate long-lived access token
      const longLivedAccessToken = generateLongLivedAccessToken(user._id);

      // Save the long-lived access token to the user document in the database
      user.longLivedAccessToken = longLivedAccessToken;
      await user.save();

      // Return the access tokens along with the user object
      return handleResponse(ResponseCodes.success, ResponseMessages.loginSuccess, { user, accessToken, longLivedAccessToken });
    } catch (error) {
      return internalServerError;
    }

  }
  public async generateAndSendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()// Generate a 6-digit OTP
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes

    const user = await User.findOneAndUpdate(
      { email },
      { otp, otpExpiry },
      { new: true }
    );

    if (!user) {
      return handleResponse(ResponseCodes.notFound,ResponseMessages.userNotFound)
    }
    if (user) {
      return handleResponse(ResponseCodes.success, ResponseMessages.otpsent, otp)
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
  }

  public async resetPassword(email: string, otp: string, newPassword: string) {

    const user = await User.findOne({ email });
    if (!user) {
      return handleResponse(ResponseCodes.notFound, ResponseMessages.userNotFound);
    }

    if (user.otp.toString() !== otp) {
      console.log("user otp from db", typeof (user.otp))
      console.log('otp', otp)
      return handleResponse(ResponseCodes.invalidOTP, ResponseMessages.invalidOtp);
    }

    if (new Date() > user.otpExpiry) {
      return handleResponse(ResponseCodes.expiredOTP, ResponseMessages.expiredOtp);
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and reset OTP and expiry
    user.password = hashedPassword;
    user.otp = '';
    user.otpExpiry = new Date(0); // Set to a specific date in the past
    await user.save();
    return handleResponse(ResponseCodes.success, ResponseMessages.passwordReset)
  }

  public async getUserDetails(userId:number){
    const user = await User.findOne({userId})
    if(!user){
      return handleResponse(ResponseCodes.notFound, ResponseMessages.userNotFound);
    }
    const response ={
      firstName:user.firstName,
      lastName:user.lastName,
      userName:user.username,
      email:user.email,
      image:user.profilePhoto
    }
    return handleResponse(ResponseCodes.success, ResponseMessages.UserDetails,response)
  }


  public async changePassword(userId: number, currentPassword: string, newPassword: string) {
    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
        return handleResponse(ResponseCodes.notFound, ResponseMessages.userNotFound);
    }

    // Check if the current password provided matches the password stored in the database
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        return handleResponse(ResponseCodes.unauthorized, ResponseMessages.invalidCurrentPassword);
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    return handleResponse(ResponseCodes.success, ResponseMessages.passwordChanged);
}

public async uploadProfilePhoto(userId: string, profilePhotoPath: string) {
  try {
      // Find the user by userId
      const user = await User.findOne({ userId });
      if (!user) {
          return handleResponse(ResponseCodes.notFound, ResponseMessages.userNotFound);
      }

      // Update user document with profile photo path
      user.profilePhoto = profilePhotoPath;
      await user.save();

      return handleResponse(ResponseCodes.success, ResponseMessages.userRegistered, { profilePhoto: profilePhotoPath });
  } catch (error) {
      console.error(error);
      return internalServerError;
  }
}
}


export default new UserService();
