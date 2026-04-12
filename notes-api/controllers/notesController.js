import { getDBConnection } from "../database/db.js";



// Notes CRUD but i didnt implement any type of user IDing
export async function getAllNotes(req,res){
    const db = await getDBConnection()

    const notes = await db.all(
        `SELECT * FROM notes`
    )

    return res.status(200).json({notes})
}

export async function addNote(req,res){

    const db = await getDBConnection()
    try{
        const {title,content} = req.body

        const result = await db.run(`
            INSERT INTO notes(title,content) VALUES(?,?)
            `,[title,content])
        return res.status(201).json({id : result.lastID,title,content})

    }catch(err){
        return res.status(500).json({"error": `failure to add note due to ${err}`})
    }
    
}

export async function deleteNote(req,res){
    const db = await getDBConnection()
    const noteId = req.params.id

    try{

        await db.run(`
            DELETE FROM notes WHERE id = ?`, [noteId])
        
    
        return res.status(201).json({"message": "note deleted"})
    }catch(err){
        return res.status(500).json({"error": `failure to delete note due to ${err}`})
    }
    
}

export async function updateNote(req,res){
    const db = await getDBConnection()
    const noteId = req.params.id
    const {title, content} = req.body
    try{
        await db.run(`
            UPDATE notes
            SET title = ? , content = ?
            WHERE id = ?
            `, [title,content, noteId])

        res.status(201).json({'message': "note updated"})
    }catch(err){
        res.status(500).json({"error":`couldnt update note due to ${err}`})
    }
}