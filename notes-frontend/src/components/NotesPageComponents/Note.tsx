import React from "react";



type Note = {title : string; content: string}
export default function Note({title, content}: Note){


    return (
        <div className="noteCard">
            <h1 className="noteCard-title">{title}</h1>
            <p className="noteCard">{content}</p>
        </div>
    )

}