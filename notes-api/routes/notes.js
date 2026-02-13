import {getAllNotes, addNote , deleteNote, updateNote} from '../controllers/notesController.js'

import express from 'express'

export const notesRouter = express.Router()

notesRouter.get('/', getAllNotes)
notesRouter.post('/', addNote)
notesRouter.delete('/:id', deleteNote)
notesRouter.put('/:id',updateNote)