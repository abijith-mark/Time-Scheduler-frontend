import { useEffect } from "react";
import {
    getDayDropList,
    getLastDate,
    getYearDropList,
    monthBefore,
} from "../../../Services/actions/time";
import "../CalendarHeader/calendarHeader.css";

function CalendarHeader(props: {
    clickMonthHandler(mon: string): void;
    month: string;
    clickYearHandler(year: string): void;
    year: string;
    clickDateHandler(date: number): void;
    date: number;
}) {
    useEffect(() => {
        if (
            props.date >
            getLastDate(
                new Date(parseInt(props.year), monthBefore[props.month], 1)
            )
        ) {
            props.clickDateHandler(1);
        }
    }, [props.month, props.year]);

    return (
        <>
            <div className="options_container">
                <select className="opt"
                    value={props.month}
                    name="month"
                    id="month"
                    onChange={(e) => {
                        props.clickMonthHandler(e.target.value);
                    }}
                >
                    {Object.keys(monthBefore).map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    className="opt"
                    value={props.year}
                    name="year"
                    id="year"
                    onChange={(e) => {
                        props.clickYearHandler(e.target.value);
                    }}
                >
                    {getYearDropList()}
                </select>
                <select
                    className="opt"
                    value={props.date}
                    name="date"
                    id="date"
                    onChange={(e) => {
                        props.clickDateHandler(parseInt(e.target.value));
                    }}
                >
                    {getDayDropList(props.month, props.year)}
                </select>
            </div>
        </>
    );
}

export default CalendarHeader;
