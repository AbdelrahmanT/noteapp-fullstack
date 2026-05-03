import { Navigate } from "react-router-dom"

type User = {
    username: string ,
    email: string,
    password: string,
}

// export async function isLoggedIn(user: Omit<User, "email">){

// }

export async function loginUser(user: Omit<User, "email">){
    const res = await fetch("http://localhost:3000/api/auth/login",
        {method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }
    )
    const data = await res.json()
    if(!res.ok){
        console.error(`error on logging in: ${data.error || data.message}`)
        throw data.error || data.message
    }
    localStorage.setItem('accessToken', data.accessToken)
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

export async function logout(){
    localStorage.removeItem("accessToken")
    Navigate({to : "/login"})
}