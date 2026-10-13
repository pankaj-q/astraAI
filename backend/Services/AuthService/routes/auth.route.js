import express from 'express'
import { login, userLogout } from '../controller/auth.controller.js';

const router = express.Router();


router.post('/login', login)
router.get('/logout', userLogout)

export default router