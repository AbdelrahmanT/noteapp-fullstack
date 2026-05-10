import React from "react";
import { addNote } from "../../services/userService";

type NoteCreatorProps = {
    setNotes:   React.Dispatch<React.SetStateAction<Note[]>>
}
type Note = {id: number, title : string; content: string}

export default function NoteCreator({setNotes} : NoteCreatorProps){
    const [note, setNote] = React.useState<Note>({id: -1, title: "" , content: "" })

    const [isActive, setIsActive] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement | null>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setNote(prev=>({
            ...prev,
            [name] : value
        }))
    }
    // console.log(note)
    function handleClick(e: React.MouseEvent<HTMLFormElement>) {
        setIsActive(prev=>!prev)
    }

    React.useEffect(()=>{
        if( note.title && note.content && !isActive){
            addNote(note).then((data)=>{
                setNotes((prev)=>[...prev, data])
                setNote({id: -1, title: "" , content: "" })
            }
            )
        }
    },[isActive])

    React.useEffect(()=>{
        function handleTitleInput(e: MouseEvent){
            if( e.target instanceof Node && !formRef.current?.contains(e.target )){
                console.log(note)
                setIsActive(false)
            

            // setNote(()=>({title: '', content: ''}))
            }
        }

         document.addEventListener("mousedown",handleTitleInput )

         return ()=> document.removeEventListener("mousedown", handleTitleInput)
     },[])

    return (
        <form className={`noteCreator ${isActive ? "isActive" : ""}`}  onFocus={()=>setIsActive(true)} ref={formRef} >
            { isActive?
                <input
                type="text"
                name="title"
                className="noteCreator-title"
                placeholder="Title"
                value={note.title}
                onChange={handleChange}
            />
            : null

            }
            

            <input
                type="text"
                name="content"
                className="noteCreator-text"
                placeholder="Write a note"
                value={note.content}
                onChange={handleChange}
            />
    
        </form>
    )
}