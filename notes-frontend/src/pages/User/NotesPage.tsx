import React from "react";
import { getNotes } from "../../services/userService";
import SearchBar from "../../components/SearchBar";

export default function NotesPage(){
    const [loading, setLoading] = React.useState(false)
    const [notes , setNotes] = React.useState([])
    const [query, setQuery] = React.useState("")

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
    {
        notes.length? 
        <p>alot of notes</p>:
        <h1>no notes bruh</h1>
    }
    </>
}