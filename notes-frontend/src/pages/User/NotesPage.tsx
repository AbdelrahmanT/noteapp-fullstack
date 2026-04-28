import React from "react";
import { getNotes } from "../../services/userService";
import SearchBar from "../../components/NotesPageComponents/SearchBar";
import NoteCreator from "../../components/NotesPageComponents/NoteCreator";


type NoteCreatorProps = {
    note : {title : string; text: string}
    setNote: React.Dispatch<React.SetStateAction<{
    title: string;
    text: string;
}>>
}

export default function NotesPage(){
    const [loading, setLoading] = React.useState(false)
    const [notes , setNotes] = React.useState([])
    const [query, setQuery] = React.useState("")
    const [newNote, setNewNote] = React.useState({title: "" , text : ""})

    React.useEffect(()=>{
        async function loadNotes(){
            setLoading(true)
            try {
                getNotes().then((notes)=>{
                    setNotes(notes)
                })
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false)
            }

        }
        loadNotes()

    }, [])



    if(loading){
        return <h1>Loading...</h1>
    }

    return <>
    <SearchBar query= {query} setQuery={setQuery}/>
    {/* <NoteCreator note = {newNote} setNote = {setNewNote}/> */}
    <NoteCreator/>
    
    {
        notes.length? 
        <p>alot of notes</p>:
        <h1>no notes bruh</h1>
    }
    </>
}