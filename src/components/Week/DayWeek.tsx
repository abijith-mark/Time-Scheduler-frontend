import { useEffect, useState } from "react";
import {  timeArray } from "../../Services/actions/time";
import Event from "../../Services/types/event";
import "../Week/dayWeek.css";

function DayWeek(props: { day: string; entries: Array<Event> }) {
    const [times, setTimes] = useState(Array<String>());

    useEffect(() => {
        setTimes(timeArray);
    },[]);

    return (
        <>
            <div className="dayweek_container">
                <div className="dayweek_header">{props.day}</div>
                <div className="time_container">
                    {times.map((time) => (
                        <>
                            <div className="time">{time}</div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DayWeek;
