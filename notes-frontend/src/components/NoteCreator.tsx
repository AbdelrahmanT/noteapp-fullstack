import React from "react";

type NoteCreatorProps = {
    note : {title : string; text: string}
    setNote: React.Dispatch<React.SetStateAction<{
    title: string;
    text: string;
}>>
}

export default function NoteCreator({note, setNote} : NoteCreatorProps){
    // const [note, setNote] = React.useState({title: "" , note: "" })
    const [isActive, setIsActive] = React.useState(false)
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setNote(prev=>({
            ...prev,
            [name] : value
        }))
    }
    function handleClick(e: React.MouseEvent<HTMLFormElement>) {
        setIsActive(prev=>!prev)
    }

    return (
        <form className={`noteCreator ${isActive ? "isActive" : ""}`} onClick={handleClick}>
            { isActive?
                <input
                type="text"
                name="note-title"
                className="noteCreator-title"
                placeholder="Write a note"
                value={note.title}
                onChange={handleChange}
            />
            : null

            }
            

            <input
                type="text"
                name="note-text"
                className="noteCreator-text"
                placeholder="Write a note"
                value={note.text}
                onChange={handleChange}
            />
    
        </form>
    )
}