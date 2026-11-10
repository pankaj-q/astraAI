import express from 'express'
import { getConverastaions,
         createConversation,
         saveMessage,
         getMessages,
         updateConversation,
         deleteConversation
 } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/create-conversation', createConversation);
router.get('/get-conversations', getConverastaions)
router.post('/save-message', saveMessage);
router.get('/get-messages/:conversationId', getMessages);
router.put('/update-conversation', updateConversation);
router.delete('/delete-conversation', deleteConversation);


export default router;