import React from "react";
import { addNote } from "../../services/userService";

type NoteCreatorProps = {
    setNotes:   React.Dispatch<React.SetStateAction<Note[]>>
}
type Note = {id: number, title : string; content: string}

export default function NoteCreator({setNotes} : NoteCreatorProps){
    const [note, setNote] = React.useState<Omit<Note , "id">>({ title: "" , content: "" })

    const [isActive, setIsActive] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement | null>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = e.target
        setNote(prev=>({
            ...prev,
            [name] : value
        }))
        
    }
    function handleClick(e: React.MouseEvent<HTMLFormElement>) {
        setIsActive(prev=>!prev)
    }

    React.useEffect(()=>{
        if( note.title && note.content && !isActive){
            addNote(note).then((data)=>{
                setNotes((prev)=>[...prev, data])
                setNote({ title: "" , content: "" })
            }
            )
        }
    },[isActive])

    React.useEffect(()=>{
        function handleTitleInput(e: MouseEvent){
            if( e.target instanceof Node && !formRef.current?.contains(e.target )){
                setIsActive(false)
            

            // setNote(()=>({title: '', content: ''}))
            }
        }

         document.addEventListener("mousedown",handleTitleInput )

         return ()=> document.removeEventListener("mousedown", handleTitleInput)
     },[])

    return (
        <form className={`noteCreator ${isActive ? "isActive" : ""}`}
            onFocus={()=>setIsActive(true)}
            ref={formRef}
            onSubmit={(e)=>{
                e.preventDefault()
                setIsActive(false)
            }}
        >
            { isActive || note.content !== ""?
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
            

            <textarea
                name="content"
                className="noteCreator-content"
                placeholder="Write a note"
                value={note.content}
                onChange={handleChange}
                rows={1}
                
            />
    
        </form>
    )
}