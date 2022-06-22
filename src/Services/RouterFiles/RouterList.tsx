import {BrowserRouter as  Router, Routes, Route, Link } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import SignIn from "../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";

function RouterList(){
    return (
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/dashboard" element={<Calendar/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    );
}

export default RouterList