import {getAuth} from 'firebase-admin/auth'
import {app} from '../config/firebase.js'
import User from '../model/user.model.js'
import crypto from 'crypto'
export const login = (async(req, res) => {
    try {
        const {token} = req.body;
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({
          firebaseUid: decoded.uid,
        });
        // Migrate legacy docs created with firebaseUid = email (bug): find by email and patch uid
        if (!user && decoded.email) {
            user = await User.findOne({
                $or: [{ email: decoded.email }, { firebaseUid: decoded.email }],
            });
            if (user) {
                user.firebaseUid = decoded.uid;
                if (!user.email) user.email = decoded.email;
                if (!user.name && decoded.name) user.name = decoded.name;
                if (!user.avatar && decoded.picture) user.avatar = decoded.picture;
                await user.save();
            }
        }
        if(!user){
            user = await User.create({
              firebaseUid: decoded.uid,
              email: decoded.email,
              name: decoded.name,
              avatar: decoded.picture,
            });
        }
        const sessionId = crypto.randomUUID();
        res.cookie("session", sessionId,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: `Error in login ${error}`
        })
    }
})
