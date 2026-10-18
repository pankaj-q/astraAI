import express from 'express'
import { getConverastaions,
         createConversation,
         saveMessage,
         getMessages,
         updateConversation
 } from '../controllers/chat.controller';

const router = express.Router();

router.get('/create-conversation', createConversation);
router.get('/get-conversatoins', getConverastaions)
router.post('/save-message', saveMessage);
router.get('/get-messages/:conversationId', getMessages);
router.put('/update-conversation', updateConversation);


export default router;