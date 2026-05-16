import React from "react";
import { deleteNote } from "../../services/userService";
import TrashIcon from "../miscComponents/TrashIcon";
import EditIcon from "../miscComponents/EditIcon";


type Note = {id: number,title : string; content: string}
type NoteProps = Note&{deleteUINote: ()=>void}

export default function Note( {id,title, content , deleteUINote}: NoteProps ){
    const [isEdit, setIsEdit] = React.useState(false)
    const timerRef = React.useRef(0)
    const [deleteConfirm, setDeleteConfirm] = React.useState(false)
    const noteRef = React.useRef<HTMLDivElement | null>(null)

    async function handleDelete(){

        if(deleteConfirm){
            await deleteNote(id)
            deleteUINote()
        }else{
            timerRef.current = setTimeout(()=>{ setDeleteConfirm(false)}, 3000)
            setDeleteConfirm(true)
        }

    }

    React.useEffect(()=> {return ()=>{clearTimeout(timerRef.current)}},[])

    function handleEdit(){
        setIsEdit(prev=>!prev)
    }

    // React.useEffect(
    //     ()=>{
    //         function handleUpdate(e: MouseEvent){
    //             if(e.target instanceof Node && noteRef.current?.contains(e.target)){
                    
    //             }
    //         }
    //     }

    //     , [isEdit]
    // )

    
    

    return (
        <div className="noteCard" ref= {noteRef} onClick={()=>{deleteConfirm && setDeleteConfirm(false)}}>
            {
                isEdit?
                <>
                    <div className="fullScreenOverlay">
                        hi
                    </div>
                </>:
                <>
                    <h1 className="noteCard-title">{title}</h1>
                    <pre className="noteCard-note">{content}</pre>
                </>
            }
            
            
            
            <button className="delete" onClick={handleDelete}>
                {deleteConfirm?
                    <>
                        <span >are you sure?</span>
                        <div className="loadingBar"></div>
                        {/* timerfunction() */}
                    </>
                    : <TrashIcon/>
                } 
            </button>
            <button className="edit" onClick={()=>{isEdit? null:setIsEdit(true)}}>
                {   isEdit?
                    <><div>confirm</div><div onClick={()=>setIsEdit(false)}>cancel</div></>
                    
                    :<EditIcon/>}
            </button>
        </div>
    )

}