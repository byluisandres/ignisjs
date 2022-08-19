import ApiToken from "../Models/ApiToken.js";
import jwt from 'jsonwebtoken'

export default class TokenService {
    /**
     * Generar jwt token
     * @param {*} id 
     * @returns 
     */
    static async generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        });
    }

    /**
     * Editar el jwt token
     * @param {} id 
     * @param {*} accessToken 
     */
    static async updateToken(id, accessToken) {
        await ApiToken.create({
            user_id: id,
            token: accessToken,
            experires_at: Date.now() + 604800000,
        });
    }

    /**
     * Verificar el token
     * @param {*} token 
     * @returns 
     */
    static async verifyToken(token){
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}