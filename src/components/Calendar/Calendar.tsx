import { useState, useEffect } from "react";
import { firstDayOfMonth, weekArray } from "../../Services/actions/time";
import {
    daysMonth,
    monthArray,
    monthBefore,
} from "../../Services/actions/time";
import authService from "../../Services/authServices/auth-service";
import Services from "../../Services/Services";
import Day from "../Day/Day";
import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import "../Calendar/calendar.css"

import { useModal } from "../Modal/useModal";
import { EventModal } from "../Modal/EventModal";

import Event from "../../Services/types/event";

function Calendar() {

    const nav = useNavigate();

    const [currMonth, setCurrMonth] = useState("");
    const [currYear, setCurrYear] = useState("");
    const [currDay, setcurrDay] = useState(0);
    const [currArrDays, setCurrArrDays] = useState(Array<Date>());
    const [entryArr, setEntryArr] = useState(Object);
    const [currView, setCurrView] = useState(0);

    const [test,setTest] = useState(0);

    const [holdEvent,setHoldEvent] = useState<Event>();

    const { isShown, toggle } = useModal();

    useEffect(() => {
        if(localStorage.getItem("user")===null)
            nav("/");
        setCurrArrDays(daysMonth(new Date()));
        setCurrMonth(monthArray[new Date().getMonth()]);
        setCurrYear(new Date().getFullYear().toString());
        setcurrDay(new Date().getDate());
        Services.getMonthEntry(firstDayOfMonth(new Date())).then((response) => {
            setEntryArr(response.data);
            console.log(response.data);
        });
    }, []);

    async function updateEntry(ye: string, mo: string) {
        await Services.getMonthEntry(
            new Date(parseInt(ye), monthBefore[mo], 1)
        ).then((response) => {
            setEntryArr(response.data);
            console.log(response.data);
        });
    }

    function changeMonth(mon: string) {
        setCurrMonth(mon);
        updateEntry(currYear, mon);
        setCurrArrDays(
            daysMonth(new Date(parseInt(currYear), monthBefore[mon], currDay))
        );
    }

    function changeYear(ye: string) {
        setCurrYear(ye);
        updateEntry(ye, currMonth);
        setCurrArrDays(
            daysMonth(
                new Date(
                    Date.UTC(parseInt(ye), monthBefore[currMonth], currDay)
                )
            )
        );
    }

    function changeDate(day: number) {
        setcurrDay(day);
    }

    function changeState(num: number) {
        setCurrView(num);
        switch (num) {
            case 0:
                setCurrArrDays(
                    daysMonth(
                        new Date(
                            Date.UTC(
                                parseInt(currYear),
                                monthBefore[currMonth],
                                currDay
                            )
                        )
                    )
                );
                break;

            case 1:
                break;
        }
    }

    function addEvent(event : Event){
        setHoldEvent(event);
        setTest(test+1);
        toggle();
    }

    return (
        <>
            <EventModal
                        isShown={isShown}
                        hide={toggle}
                        headerText={"Edit Event"}
                        event = {holdEvent}
                    />
            <Header clickHandler={changeState} />
            <CalendarHeader
                clickMonthHandler={changeMonth}
                month={currMonth}
                clickYearHandler={changeYear}
                year={currYear}
                clickDateHandler={changeDate}
                date={currDay}
            />
            {currMonth + " " + currYear + " " + currDay + " " + currView}
            <br />
            <button
                onClick={() => {
                    console.log(new Date().toISOString().slice(0,16));
                }}
            >
                test
            </button>
            <br />  
            <div className="month_container">
                {currView==0 && 
                    weekArray.map((day)=>{
                        return (<h2 className="weekday_indicator">{day.toUpperCase()}</h2>)
                    })
                }
                {currView === 0 &&
                    currArrDays.map((test) => {
                        return (
                            <div className="daycomp_container" key={test.toISOString()}>
                                <Day
                                    key={test.toISOString()}
                                    day={test.toISOString().slice(0, 10)}
                                    entries={
                                        entryArr[
                                            test.toISOString().slice(0, 10)
                                        ]
                                    }
                                    addEventHandler= {addEvent}
                                />
                            </div>
                        );
                    })}
            </div>
            {currView == 1 && (
               <h1>Today</h1>
            )}
        </>
    );
}

export default Calendar;
