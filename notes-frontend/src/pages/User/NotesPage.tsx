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
                        setNotes(data)
                        // data.forEach((element : any)=>{
                        //     setNotes(prev=>[...prev, {id: element.id, title: element.title, content: element.title}])
                        // })
                    })
                    
            } catch (error) {
                console.error(`Error on loading notes: ${error}`)
            } finally{
                setLoading(false)
            }

        }
        loadNotes()

    }, [])

    function deleteUINote(id: number){
        setNotes(prev=> prev.filter( note=> note.id!==id))
    }

    function renderNotes(){
        const notesList  = []
        
        for (const note of notes) {
            note.content.includes(query) || note.title.includes(query)?
            notesList.push(
                <Note key={note.id} deleteUINote={()=>{deleteUINote(note.id)}} {...note} />
            ) : null
        }
        const notesSection =  <section className="notes-container">
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

        <NoteCreator setNotes= {setNotes}/>
        
        {
            notes.length? 
            notesSection:
            <h1>no notes bruh</h1>
        }
    </>
}