import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import authService from "../../Services/authServices/auth-service";
import "../SignIn/signIn.css"

function SignIn() {
    const nav = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("user")!==null){
            nav("/dashboard");
        }
    },[])

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            const t = await authService.login(user, pass);
            console.log(t);
            nav("/dashboard");
        } catch {
            alert("Bad Credentials");
        }
    };

    return (
        <div className="page">
            <div className="login_container">
            <img src = {require("../../assets/white_logo_1.png")}/>
                <h1>SignIn</h1>
                <div className="user_input">
                    <input
                        type="text"
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="pass_input">
                    <input
                        type="password"
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="login_button">
                    <button onClick={submit}>SignIn</button>
                </div>
                <div className="signup_button">
                    <button
                        onClick={() => {
                            nav("/signup");
                        }}
                    >
                        Not a user?
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
