import express from 'express'
import validator from 'validator'
import {getDBConnection} from '../database/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export async function registerUser(req,res){

    let {email, username, password} = req.body;
    
    if(!email || !username || !password){
        return res.status(400).json({error: "All fields must be filled"})
    }
    [email, username] = [email.trim(), username.trim()]
    if(!validator.isEmail(email)){
        return res.status(400).json({error : "invalid email address"})
    }
    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)){
        return res.status(400).json({error : "Username must be 1 to 20 letter using letters, numbers , - or _"})
    }

    try{
        const db = await getDBConnection()
        
        
        const exists = await db.get(`
            SELECT id FROM users WHERE email = ? OR username = ?
            `,[email,username])
        if(exists){
            return res.status(400).json({error: 'Email or username is in use'})
        }
        const hashedPassword = await bcrypt.hash(`${password}`, 10)
        await db.run(`
            INSERT INTO users(email,username,passwordHash) VALUES(?,?,?)
            `, [email, username, hashedPassword])
        
        return res.status(200).json({message: "Account registered"})

    }catch(err){
        console.error(`error: ${err.message}`)
        return res.status(400).json({message: "Unexpected error while registering"})
    }

}

//todo logging in

export async function loginUser(req,res){
    let {username,password}= req.body;

    if(!username || !password){
        return res.status(400).json({message: "All fields must be filled"})
    }
    try {
        const db = await getDBConnection()

        const exists = await db.get(`
            SELECT passwordHash FROM users WHERE username = ?
            `,[username])
        if(!exists){
            return res.status(400).json({message: "Username or password is incorrect"})
        }
        const {passwordHash} = exists

        const isMatch = await bcrypt.compare(password, passwordHash)
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({message: "Username or password is incorrect"})
        }
        const {id} = await db.get(`
            SELECT id FROM users WHERE username = ?
            `,[username])
        const user = {
            user_id: id,
            username
        }
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).json({accessToken})
    } catch (err) {
        console.error(`error: ${err.message}`)
        return res.status(400).json({message: "Unexpected error while logging in"})
    }
}

export async function authenticateToken(req,res, next){
    //header will be Bearer TOKEN
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token){
            return res.status(401).json({message: "recieved empty token"})
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user)=>{
            if(err){
                console.error(`error: ${err.message}`)
                return res.status(403).json({message: "invalid token"})
            }
            console.log(user)
            req.user = user
            return next()
        })
    } catch (err) {
        
        console.error(`error: ${err.message}`)
        return res.status(400).json({message: "Unexpected error while authorizing"})
    }
}