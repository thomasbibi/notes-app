import express from 'express';
import { reqValidator } from "../middlewares/request/reqValidator.js";
import { createNoteController, deleteNoteController, getNotesController, updateNote } from "./notesController.js";
import { createNoteValidation, updateNoteValidation } from "./notesValidation.js";
import { userAuthenticate } from '../middlewares/request/userAuthorizer.js';



const router = express.Router();

router.post('/user/note',userAuthenticate, reqValidator(createNoteValidation), createNoteController);
router.get('/user/notes', userAuthenticate, getNotesController);
router.patch('/user/notes', userAuthenticate,reqValidator(updateNoteValidation), updateNote);
router.delete('/user/notes', userAuthenticate,reqValidator(updateNoteValidation), deleteNoteController);


export default router;