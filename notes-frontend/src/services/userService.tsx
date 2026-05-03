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
    title: string;
    content: string;
}
export async function addNote(note : note) {
    //note comes here empty fix
    console.log(JSON.stringify(note))

    await fetch(notesUrl,
        {
            method : "post" ,
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': "application/json"
            },
            body : JSON.stringify(note)
        }
    )
}
