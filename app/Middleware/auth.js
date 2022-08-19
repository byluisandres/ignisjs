import User from '../Models/User.js';
import TokenService from '../Services/TokenService.js';

/**
 * verificar si el usuario está logueado
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const auth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = await TokenService.verifyToken(token);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            return res.status(404).send();
        }
    }
    if (!token) {
        return res.status(401).send();
    }
    next();
}

export default auth;