import {getAuth} from 'firebase-admin/auth'
import {app} from '../config/firebase.js'
import User from '../model/user.model.js'
import crypto from 'crypto'
import redis from '../../../Shared/redis/redis.js'

export const login = (async(req, res) => {
    try {
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({
          firebaseUid: decoded.uid,
        });
        if(!user){
           const user = await User.create({
              firebaseUid: decoded.uid,
              email: decoded.email,
              name: decoded.name,
              avatar: decoded.picture,
            });
        }
        const sessionId = crypto.randomUUID()
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId:user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }))


        
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
