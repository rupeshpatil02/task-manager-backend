// services/otpService.ts

import nodemailer from 'nodemailer';

 export const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you prefer
    auth: {
        user: 'your-email@example.com', // Your email address
        pass: 'your-password' // Your email password
    }
});
