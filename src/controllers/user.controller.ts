// controllers/userController.ts
import { Request, Response } from "express";
import userService from "../services/user.service";
import { internalServerError } from "../helpers/responseFormate";

class UserController {
  public async signup(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, username, email, password } = req.body;
    try {
      const newUser = await userService.createUser(
        firstName,
        lastName,
        username,
        email,
        password
      );
      res.json(newUser);
    } catch (error) {
      console.log(error);
      res.json(internalServerError);
    }
  }
  public async login(req: Request, res: Response): Promise<void> {
    const { loginIdentifier, password } = req.body;
    try {
      const response = await userService.loginUser(loginIdentifier, password);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.json(internalServerError);
    }
  }
  public async requestOtpController(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await userService.generateAndSendOtp(email);
      res.json(response);
    } catch (error) {
      return internalServerError;
    }
  }

  async resetPasswordController(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp, newPassword } = req.body;
      const response = await userService.resetPassword(email, otp, newPassword);
      res.json(response);
    } catch (error) {
      res.json(internalServerError);
    }
  }

  async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      const response = await userService.getUserDetails(userId);
      res.json(response);
    } catch (error) {
      res.json(internalServerError);
    }
  }
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId, currentPassword, newPassword } = req.body;
      const response = await userService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      res.json(response);
    } catch (error) {
      res.json(internalServerError);
    }
  }

  async uploadProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      let profilePhotoPath = "";
      if (req.file !== undefined) {
        profilePhotoPath = req.file.filename;
      } // Assuming multer middleware is configured correctly
      // Call service method to update user document with profile photo path
      const response = await userService.uploadProfilePhoto(
        userId,
        profilePhotoPath
      );

      res.json(response);
    } catch (error) {
      console.error(error);
      res.json(internalServerError);
    }
  }
}

export default new UserController();
