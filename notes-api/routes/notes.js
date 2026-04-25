import {getAllNotes, addNote , deleteNote, updateNote} from '../controllers/notesController.js'
import {authenticateToken} from "../controllers/authController.js"
import express from 'express'

export const notesRouter = express.Router()
// this route starts with /api/notes
notesRouter.use(authenticateToken)
notesRouter.get('/', getAllNotes)
notesRouter.post('/', addNote)
notesRouter.delete('/:id', deleteNote)
notesRouter.put('/:id',updateNote)