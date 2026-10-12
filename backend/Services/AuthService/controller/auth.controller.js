import {getAuth} from 'firebase-admin'
import {app} from '../config/firebase.js'
import User from '../model/user.model.js'
import { createConnection } from 'mongoose'
export const login = (async(req, res) => {
    try {
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        const user = await user.findOne({
          firebaseUid:decoded.uid,
        });
        if(!user){
            const user = await user.create({
              firebaseUid: decoded.name,
              firebaseUid: decoded.email,
              firebaseUid: decoded.picture,
            }); 
        }
        const sessionId = crypto.randomUUID();
        res.cookie("session", sessionId,{
        httpOnly: true,
        secure: false,
        sameSite:"strick",
        maxAge:7*24*60*60*100
        })
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: `Error in login ${error}`
        })
    }
})