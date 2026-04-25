import { getDBConnection } from "../database/db.js";



// Notes CRUD 
export async function getAllNotes(req,res){
    const db = await getDBConnection()

    try {
        const notes = await db.all(
        `SELECT * FROM notes WHERE user_ID = ?`,
        [req.user.user_id]
    )
    
    return res.status(200).json({notes})

    } catch (error) {
        console.error(`error on getting notes ${err}`)
        return res.status(500).json({message: "failure to retrieve notes"})
    }

    
}

export async function addNote(req,res){

    const db = await getDBConnection()
    try{
        const {title,content} = req.body
        const {user_id} = req.user
        console.log(req.user)
        const result = await db.run(`
            INSERT INTO notes(title,content,user_ID) VALUES(?,?,?)
            `,[title,content,user_id])
        return res.status(201).json({id : result.lastID,title,content})

    }catch(err){
        console.error(`error on adding note ${err}`)
        return res.status(500).json({error: `failure to add note`})
    }
    
}

export async function deleteNote(req,res){
    const db = await getDBConnection()
    const noteId = req.params.id

    try{

        await db.run(`
            DELETE FROM notes WHERE user_ID = ? AND id = ?`, [req.user.user_id,noteId])
        
    
        return res.status(201).json({"message": "note deleted"})
    }catch(err){
        console.error(`error on deleting note ${err}`)
        return res.status(500).json({error: `failure to delete note`})
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
            WHERE user_ID = ? AND id = ?
            `, [title,content,req.user.user_id, noteId])

        res.status(201).json({'message': "note updated"})
    }catch(err){
        console.error(`error on update ${err}`)
        res.status(500).json({error : "failure to update note"})
    }
}