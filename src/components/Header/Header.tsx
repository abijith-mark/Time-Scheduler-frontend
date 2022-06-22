import { useEffect, useState } from "react";
import authService from "../../Services/authServices/auth-service";
import "./Header.css";
import Notification from "../../Services/types/notification";
import Services from "../../Services/Services";
import { useNavigate } from "react-router-dom";

interface Prps {
    clickHandler(num: number): void;
}

function Header(props: Prps) {

    const nav = useNavigate()

    const [open, setOpen] = useState(false);
    const [noti, setNoti] = useState(Array<Notification>());

    useEffect(() => {
        Services.getNoti().then((response) => {
            setNoti(response.data);
        });
    }, [open]);

    function acceptNotification(id: string) {
        Services.acceptNoti(id);
    }

    function rejectNotification(id: string) {
        Services.rejectNoti(id);
    }

    return (
        <>
            <div className="header_container">
                <div className="header">
                    <div className="logo_container">
                        <img
                            src={require("../../assets/white_logo_1.png")}
                            alt="logo"
                            className="logo"
                        />
                    </div>

                    <div className="nav_container">
                        <div className="nav">
                            <button
                                className="btn month"
                                onClick={() => props.clickHandler(0)}
                            >
                                Month
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="btn today"
                                onClick={() => props.clickHandler(1)}
                            >
                                Today
                            </button>
                        </div>
                    </div>

                    <div className="btn_container">
                        <button
                            className="btn login"
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            🔔
                        </button>
                        {open && (
                            <div className="dd_container">
                                {noti.map((notes) => {
                                    return (
                                        <>
                                            <div className="dd_element">
                                                <p>
                                                    <b>From : {notes.from}</b>{" "}
                                                    <br />
                                                    {notes.message}
                                                    <br />
                                                </p>
                                                <div className="action_btns">
                                                    <button
                                                        onClick={() => {
                                                            acceptNotification(
                                                                notes.id
                                                            );
                                                        }}
                                                    >
                                                        X
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            rejectNotification(
                                                                notes.id
                                                            );
                                                        }}
                                                    >
                                                        v
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        )}
                        <button
                            className="btn signup"
                            onClick={() => {
                                authService.logout();
                                nav("/");
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
