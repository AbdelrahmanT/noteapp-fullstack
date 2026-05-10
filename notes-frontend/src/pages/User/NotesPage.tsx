import React from "react";
import { getNotes } from "../../services/userService";
import SearchBar from "../../components/NotesPageComponents/SearchBar";
import NoteCreator from "../../components/NotesPageComponents/NoteCreator";
import Note from "../../components/NotesPageComponents/Note";


type Note = {id : number, title : string; content: string}

export default function NotesPage(){
    const [loading, setLoading] = React.useState(true)
    const [notes , setNotes] = React.useState<Note[]>([])
    const [query, setQuery] = React.useState("")
    const [newNote, setNewNote] = React.useState({title: "" , content : ""})

    

    React.useEffect(()=>{
        async function loadNotes(){
            try {
                getNotes()
                    .then((data)=>{
                        data.forEach((element : any)=>{
                            setNotes(prev=>[...prev, {id: element.id, title: element.title, content: element.title}])
                        })
                    })
                    
            } catch (error) {
                console.error(`Error on loading notes: ${error}`)
            } finally{
                setLoading(false)
            }

        }
        loadNotes()

    }, [])

    function renderNotes(){
        const notesList  = []
        console.log(notes);
        
        for (const note of notes) {
            notesList.push(
                <Note key={note.id} {...note}/>
            )
        }
        const notesSection =  <section className="allNotes">
                {notesList.map(note=>note)}
            </section>

        return notesSection
    }
    const notesSection = renderNotes()

    
    if(loading){
        return <h1>Loading...</h1>
    }
    return <>
        <SearchBar query= {query} setQuery={setQuery}/>

        {/* <NoteCreator note = {newNote} setNote = {setNewNote}/> */}
        <NoteCreator setNotes= {setNotes}/>
        
        {
            notes.length? 
            notesSection:
            <h1>no notes bruh</h1>
        }
    </>
}