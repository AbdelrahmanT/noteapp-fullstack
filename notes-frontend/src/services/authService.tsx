
type User = {
    username: string ,
    email: string,
    password: string,
}

export async function login(user: User){

}

export async function registerUser(user: User){
    console.log(JSON.stringify(user))
    const res = await fetch("http://localhost:3000/api/auth/register",
        {method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }
    )
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        throw data.error
    } 
    return data.message
}

export async function logout(user: User){

}