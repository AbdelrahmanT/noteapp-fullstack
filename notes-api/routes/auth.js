import express from 'express'
import {loginUser, registerUser} from '../controllers/authController.js'
export const authRouter = express.Router()

authRouter.post('/register', registerUser)
// needs to post email, username, password
authRouter.post('/login', loginUser)
// needs to post username, password
// returns access token which will be used in header as BEARER [token]

// authRouter.get('/logout')