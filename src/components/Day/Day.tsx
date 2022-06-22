import { useState, useEffect } from "react";
import Services from "../../Services/Services";
import Event from "../../Services/types/event";
import "../Day/day.css";

function Day(props: {
    day: string;
    entries: Array<Event>;
    addEventHandler(event: Event | undefined): void;
}) {
    const [state, setStat] = useState(Array<Event>());
    const [test, setTest] = useState(0);

    let emptyEvent : Event = {
        id : null,
        users : [],
        title : "",
        desc : "",
        start : new Date(props.day),
        end : new Date(props.day),
        status : 0,
        pending : [],
        remind : -1
    }

    useEffect(() => {
        if (typeof props.entries != "undefined") {
            setStat(props.entries);
        }
    }, [props.entries]);

    function onDragOver(e: any) {
        e.preventDefault();
    }

    function onDragStart(e: any, event: Event) {
        var s = JSON.stringify(event);
        e.dataTransfer.setData("event", s);
    }

    function onDragEnd(event: Event) {
        state.splice(state.indexOf(event), 1);
        setStat(state);
        setTest(test + 1);
    }

    function onDrop(e: any, s: string) {
        let x = e.dataTransfer.getData("event");
        let event: Event = JSON.parse(x);
        console.log(event);
        event.start = new Date(props.day.concat(new Date(event.start).toISOString().slice(10,25)));
        event.end = new Date(props.day.concat(new Date(event.end).toISOString().slice(10,25)));
        // state.splice(state.indexOf(event))
        //update event in db
        Services.update(event);
        state.push(event);
        setStat(state);
        setTest(test + 1);
    }

    return (
        <>
            <div className="day_container">
                <div className="day_num">{props.day.slice(8, 10)}</div>
                <div className="addEntry">
                    <button className="entryButton" onClick={()=>{props.addEventHandler(emptyEvent)}}>+</button>
                </div>
            </div>
            <div
                className="event_container droppable"
                onDragOver={(e) => {
                    onDragOver(e);
                }}
                onDrop={(e) => {
                    onDrop(e, "test");
                }}
            >
                {state.map((event) => {
                    return (
                        <div
                            className="event"
                            draggable
                            key={event.id}
                            onDragStart={(e) => {
                                onDragStart(e, event);
                            }}
                            onDragEnd={(e) => {
                                onDragEnd(event);
                            }}
                            onClick={()=>{props.addEventHandler(event)}}
                        >
                            {event.title}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Day;
