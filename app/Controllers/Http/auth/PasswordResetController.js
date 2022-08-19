import PasswordReset from "../../../Models/PasswordReset.js"
import nodemailer from 'nodemailer'
import { rememberToken } from "../../../../helpers/remenberToken.js";
import User from "../../../Models/User.js";

export default class PasswordResetController {
    /**
    * Forgot password, enviar el link al email
    */
    static async forgotPassword(req, res) {
        const { email } = req.body;
        if (await User.findOne({ email })) {
            const passwordReset = await PasswordReset.create({
                email: email,
                token: rememberToken()
            })

            let transport = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_POST,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            });

            await transport.sendMail({
                from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
                to: email,
                subject: "Password reset",
                text: "Reset password",
                html: `Reset Password 
                <a href="${process.env.URL_FRONT}/reset-password?token=${passwordReset.token}&email=${email}">reset password</a>
                <p>${process.env.URL_FRONT}/reset-password?token=${passwordReset.token}&email=${email}</p>`,
            });

            res.status(200).send();

        } else {
            res.status(403).send();
        }
    }

    /**
     * Reset password
     */

    static async resetPassword(req, res) {
        const { email, password, token } = req.body;

        const existsToken = await PasswordReset.findOneAndDelete(token);
        if (existsToken) {
            const user = await User.findOne({ email });
            if (user) {
                try {
                    user.password = password;
                    await user.save();
                    res.status(200).send();
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            res.status(404).send();
        }
    }
}