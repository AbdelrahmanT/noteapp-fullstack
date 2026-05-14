const notesUrl = "http://localhost:3000/api/notes"
const accessToken : string | null = localStorage.getItem("accessToken") 



export async function getNotes(){
    
    
    console.log('hi');
    
    const res = await fetch(notesUrl, 
                            {
                                method : "get",
                                headers :{'authorization': `Bearer ${accessToken}`}
                            }
    )
    const data = await res.json()
    if(!res.ok){
        console.error(`error on getting notes ${data.error || data.message}`)
        return data.error || data.message
    }
    
    return data.notes
}

type note = {
    id: number;
    title: string;
    content: string;
}
export async function addNote(note : Omit<note, "id">) {
    //note comes here empty fix
    console.log(JSON.stringify(note))

    const res = await fetch(notesUrl,
        {
            method : "post" ,
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': "application/json"
            },
            body : JSON.stringify(note)
        }
    )
    const data = await res.json()
    return data
}

export async function deleteNote(id: number){
    const res = await fetch(notesUrl+`/${id}`,
        {
            method : "delete",
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': "application/json"
            },
            
        }
    )
    const data = await res.json()
    if(!res.ok){
        console.error(`error on deleting note ${data.error || data.message}`)
        return data.error || data.message
    }else{

        console.log(data)
    }

}