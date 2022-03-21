import jwt from 'jwt-then';

export const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw 'Forbidden!';

        const token = req.headers.authorization.split(' ')[1];
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Forbidden 🚫🚫🚫'
        });
    }
}
