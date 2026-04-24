import React from "react";
import {loginUser} from "../services/authService.tsx"
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [loginFormData, setLoginFormData] = React.useState({username: "", password: ""})
    const [buttonStatus, setButtonStatus] = React.useState("idle")
    const [loginStatus, setLoginStatus] = React.useState("")

    const navigate = useNavigate()
    
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setButtonStatus("submitting")
        loginUser(loginFormData)
            .then(data=>{
                console.log(data)
                setLoginStatus(data)
                //navigate later
            })
            .catch(err=>{
                console.error(err)
                setLoginStatus(typeof err === "string"? err: "Unexpected error" )
                
            })
            .finally(()=>{
                setButtonStatus("idle")
            })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        setLoginFormData(prev=>({
            ...prev,
            [name]: value
        }))
    }

    return <>
        <h1>Login</h1>
        <h3>{loginStatus}</h3>


        <form onSubmit={handleSubmit} className="auth-form" >
            <input
                type="username"
                name="username"
                placeholder="Username"
                value={loginFormData.username}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleChange}
                required
            />
            <button disabled={buttonStatus==="submitting"}>
                {buttonStatus === "submitting" ? "logging in..." : "Login"}
            </button>
            <a href="" onClick={()=> navigate('/register')}>Dont have an account? Register</a>
        </form>
    </>
}