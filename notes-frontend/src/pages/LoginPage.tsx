import React from "react";
import {loginUser} from "../services/authService.tsx"
import { useNavigate, useLocation, replace } from "react-router-dom";

export default function LoginPage(){
    const [loginFormData, setLoginFormData] = React.useState({username: "", password: ""})
    const [buttonStatus, setButtonStatus] = React.useState("idle")
    const [loginStatus, setLoginStatus] = React.useState("")

    const location = useLocation()
    const navigate = useNavigate()
    
    const navDestination = location.state?.from || "/user" 

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setButtonStatus("submitting")
        loginUser(loginFormData)
            .then(()=>{
                setLoginStatus("logged in")
                console.log(navDestination)
                navigate(navDestination)
                //navigate later
            })
            .catch(err=>{
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
                type="text"
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
            <button type="submit" disabled={buttonStatus==="submitting"}>
                {buttonStatus === "submitting" ? "logging in..." : "Login"}
            </button>
            <a href="" onClick={()=> navigate('/register')}>Dont have an account? Register</a>
        </form>
    </>
}