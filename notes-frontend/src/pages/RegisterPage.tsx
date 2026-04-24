import React from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../services/authService.tsx"

export default function RegisterPage(){
    const [registerFormData, setRegisterFormData] = React.useState({username: "",email: "" , password: ""})
    const [buttonStatus, setButtonStatus] = React.useState("idle")
    const [registerStatus, setRegisterStatus] = React.useState("")

    const navigate = useNavigate()

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setButtonStatus("submitting")
        registerUser(registerFormData)
            .then(data=>{
                console.log(data)
                setRegisterStatus(data)
                //navigate later
            })
            .catch(err=>{
                console.error(err)
                setRegisterStatus(typeof err === "string"? err: "Unexpected error" )
                
            })
            .finally(()=>{
                setButtonStatus("idle")
            })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        setRegisterFormData(prev=>({
            ...prev,
            [name]: value
        }))
    }

    return <>
        <h1>Register</h1>
        <h3>{registerStatus}</h3>


        <form onSubmit={handleSubmit} className="auth-form"  >
            <input
                type="username"
                name="username"
                placeholder="Username"
                value={registerFormData.username}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email address"
                value={registerFormData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerFormData.password}
                onChange={handleChange}
                required
            />
            <button disabled={buttonStatus==="submitting"}>
                {buttonStatus === "submitting" ? "Registering...." : "Register"}
            </button>
            <a href="" onClick={()=> navigate('/login')}>Have an account? Login.</a>
        </form>
    


    </>
}