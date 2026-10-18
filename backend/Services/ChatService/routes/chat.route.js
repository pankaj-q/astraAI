import express from 'express'
import { getConverastaions,
         createConversation,
         saveMessage,
         getMessages,
         updateConversation
 } from '../controllers/chat.controller';

const router = express.Router();

router.post('/create-conversation', createConversation);
router.get('/get-conversatoins', getConversations)
router.post('/save-message', saveMessage);
router.get('/get-messages', getMessages);
router.put('/update-conversation', updateConversation)


export default router;