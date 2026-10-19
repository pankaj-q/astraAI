import express from 'express'
import getAgent from '../controllers/agent.controller.js'


const router = express.Router();

router.post('/get-chat', getAgent)

export default router;