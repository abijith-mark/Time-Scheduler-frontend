import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authServices/auth-service";

function SignUp(){

    const nav = useNavigate();

    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("user")!==null)
            nav("/dashboard");
    },[])

    async function submit(){
        authService.register(user,email,pass);
        nav("/");
    }

    return (
        <>
            <div className="login_container">
                <h1>SignUp</h1>
                    <div className="user_input">
                        <input type="text" onChange={(e)=>{setUser(e.target.value)}}></input>
                    </div>
                    <div className="email_input">
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
                    </div>
                    <div className="pass_input">
                        <input type="password" onChange={(e)=>{setPass(e.target.value)}}></input>
                    </div>
                    <div className="SignUp_button">
                        <button onClick={submit}>Register</button>
                    </div>
                    <div className="Login_Redirect">
                        <a href="/">Already a User?</a>
                    </div>
            </div>
        </>
    )
}

export default SignUp;