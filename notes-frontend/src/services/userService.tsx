const notesUrl = "http://localhost:3000/api/notes"

export async function getNotes(){

    const accessToken : string = localStorage.getItem("accessToken") || ""
    console.log('hi');
    
    const res = await fetch(notesUrl, 
                            {
                                method : "get",
                                headers :{'authorization': `Bearer ${accessToken}`}
                            }
    )
    const data = await res.json()
    if(!res.ok){
        return data.error || data.message
    }
    
    return data.notes
}