import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {

    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        const user = await User.findById(req.body.userId);
        if (user) {
            req.user = user;
            next();
        }
        else {
            res.json({ success: false, message: "user not found" });
        }
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

const adminMiddleware = async (req, res, next) => {

    const user = req.user;
    if (user && user.isAdmin) {
        next();
    }
    else res.status(403).json({ message: 'Not authorized as admin' });

};

export { authMiddleware, adminMiddleware };
