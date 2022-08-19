import User from '../../../Models/User.js'
import { rememberToken } from '../../../../helpers/remenberToken.js';
import TokenService from '../../../Services/TokenService.js';
import ApiToken from '../../../Models/ApiToken.js';

export default class AuthenticatedController {
    /**
     * Función para registrar al usuario
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async register(req, res) {
        try {
            const user = new User(req.body);
            if (user.confirmEmail()) {
                user.remember_token = rememberToken();
            }

            await user.save();

            res.status(201).json({ user });
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * Función para logear al usuario
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send();
        }

        // // confirmar cuenta
        if (!user.email_verified_at && user.confirmEmail()) {
            return res.status(403).send();
        }
        // comparar el password
        if (await user.comparePassword(password)) {
            const accessToken = await TokenService.generateToken(user._id);
            await TokenService.updateToken(user._id, accessToken);
            return res.status(200).json({ access_token: accessToken });
        } else {
            return res.status(403).send();
        }
    }

    /**
     * Borrar el token
     * @param {*} req 
     * @param {*} res 
     */
    static async logout(req, res) {
        const id = req.user.id;
        const apiToken = await ApiToken.findOneAndDelete({ user_id: id });
        if (apiToken) {
            res.status(200).send()
        } else {
            res.status(404).send()
        }

    }

    /**
     * Obtener información del usuario
     * @param {*} req 
     * @param {*} res 
     */
    static async me(req, res) {
        res.status(200).json({ data: req.user })
    }
}