import express from 'express'
import cors from 'cors'
import { notesRouter } from './routes/notes.js'
import { authRouter } from './routes/auth.js'
import 'dotenv/config';

const app = express()
const PORT = 3000

const allowedOrigins = [
  'http://localhost:5173',
  'https://noteapp-fullstack-uoxy.vercel.app'
]

app.options('*', cors())

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/auth', authRouter)

app.listen(PORT , ()=>{
    console.log(`LISTENING ON PORT ${PORT}`)

})