import React from "react";

type NoteCardProps = {
    title: string;
    noteText : string;
}

export default function Note({title, noteText}: NoteCardProps){


    return (
        <div className="noteCard">
            <h1 className="noteCard-title">{title}</h1>
            <p className="noteCard">{noteText}</p>
        </div>
    )

}