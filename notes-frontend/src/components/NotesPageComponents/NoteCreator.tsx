import React from "react";

type NoteCreatorProps = {
    note : {title : string; text: string}
    setNote: React.Dispatch<React.SetStateAction<{
        title: string;
        text: string;
    }>>
}

export default function NoteCreator(/*{note, setNote} : NoteCreatorProps*/){
    const [note, setNote] = React.useState({title: "" , text: "" })

    const [isActive, setIsActive] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement | null>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setNote(prev=>({
            ...prev,
            [name] : value
        }))
    }
    console.log(note)
    function handleClick(e: React.MouseEvent<HTMLFormElement>) {
        setIsActive(prev=>!prev)
    }

    React.useEffect(()=>{
        const handleTitleInput = (e: MouseEvent)=>{
            if( e.target instanceof Node && !formRef.current?.contains(e.target )){
                setIsActive(false)
                
                setNote((prev)=>({title: '', text: ''}))
            }
         }

         document.addEventListener("mousedown",handleTitleInput )

         return ()=> document.removeEventListener("mousedown", handleTitleInput)
     },[])

    return (
        <form className={`noteCreator ${isActive ? "isActive" : ""}`} onFocus={()=>setIsActive(true)} ref={formRef} >
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
                name="text"
                className="noteCreator-text"
                placeholder="Write a note"
                value={note.text}
                onChange={handleChange}
            />
    
        </form>
    )
}