import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../Modal/eventModal.css";
import Event from "../../Services/types/event";
import Services from "../../Services/Services";
import { convertDateToUTC } from "../../Services/actions/time";

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
    event: Event | undefined;
}

export const EventModal: FunctionComponent<ModalProps> = ({
    isShown,
    hide,
    headerText,
    event,
}) => {
    useEffect(() => {
        if (event !== undefined) {
            console.log("defined");
            setTitle(event.title);
            setDesc(event.desc);
            setStart(event.start);
            setEnd(event.end);
            setStatus(event.status);
            setPending(event.pending);
            setRemind(event.remind);
        }
    }, [event]);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const [status, setStatus] = useState(0);
    const [pending, setPending] = useState(Array<string>());
    const [remind, setRemind] = useState(0);

    function saveEvent(e: any) {
        var s = localStorage.getItem("user");
        var username: string = "";
        if (s != null) username = s;

        let event: Event = {
            users: [username.slice(1, username.length - 1)],
            title: title,
            desc: desc,
            start: start,
            end: end,
            status: status,
            pending: pending,
            remind: remind,
        };
        Services.create(event);
    }

    function deleteEntry(id : string){
        Services.delete(id);
    }

    const modal = (
        <React.Fragment>
            <div className="backdrop">
                <div className="wrapper">
                    <div className="styled_modal">
                        <div className="modal_header">
                            <div className="modal_header_text">
                                {headerText}
                            </div>
                            <div className="close_button" onClick={hide}>
                                X
                            </div>
                        </div>
                        <div className="content">
                            <div className="form_container">
                                <label>Title</label>
                                <input
                                    id="title"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                ></input>
                                <label>Description</label>
                                <input
                                    id="desc"
                                    value={desc}
                                    onChange={(e) => {
                                        setDesc(e.target.value);
                                    }}
                                ></input>
                                <label>Start Time</label>
                                <input
                                    id="start"
                                    value={new Date(start)
                                        .toISOString()
                                        .slice(0, 16)}
                                    type={"datetime-local"}
                                    onChange={(e) => {
                                        setStart(
                                            convertDateToUTC(
                                                new Date(e.target.value)
                                            )
                                        );
                                    }}
                                ></input>

                                <label>End Time</label>
                                <input
                                    id="end"
                                    value={new Date(end)
                                        .toISOString()
                                        .slice(0, 16)}
                                    type={"datetime-local"}
                                    onChange={(e) => {
                                        setEnd(
                                            convertDateToUTC(
                                                new Date(e.target.value)
                                            )
                                        );
                                    }}
                                ></input>
                                <label>Status</label>
                                <input
                                    id="status"
                                    value={status}
                                    type={"number"}
                                    onChange={(e) => {
                                        setStatus(parseInt(e.target.value));
                                    }}
                                ></input>
                                <label>Add Members</label>
                                <input
                                    id="pending"
                                    value={pending}
                                    onChange={(e) => {
                                        setPending(e.target.value.split(","));
                                    }}
                                ></input>
                                <label>Remind me in</label>
                                <input
                                    id="Remind"
                                    value={remind}
                                    type={"number"}
                                    onChange={(e) => {
                                        setRemind(parseInt(e.target.value));
                                    }}
                                ></input>
                            </div>
                            <div className="btn_holder">
                                <button
                                    className="save_button"
                                    onClick={(e) => {
                                        saveEvent(e);
                                        hide();
                                    }}
                                >
                                    Save
                                </button>
                                {event !== undefined && (
                                    <button
                                        onClick={() => {
                                            deleteEntry(event.id);
                                            hide();
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
