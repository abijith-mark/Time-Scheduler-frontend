//Get array of dates between the specified dates
const getDaysArray = (start: Date, end: Date): Date[] => {
    const arr: Date[] = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

export const convertDateToUTC = (date: Date) : Date => {
    return new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()));
}

// Convert String date to Date
export const stringToDate = (starts: string): Date => {
    const start = new Date(starts);
    return start;
};

export const getMonthDates = (month: number, year: number): Date[] => {
    return getDaysArray(
        firstDayOfMonth(new Date(year, month, 0)),
        new Date(year, month, 1)
    );
};

export const daysBefore: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

export const monthBefore: { [key: string]: number } = {
    January: 0,
    Feburary: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};

export const monthArray: string[] = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const weekArray: string[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export const timeArray: string[] = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
];

export const getYearDropList = () => {
    const year = new Date().getFullYear() - 10;
    return Array.from(new Array(20), (v, i) => (
        <option key={i} value={year + i}>
            {year + i}
        </option>
    ));
};

export const getLastDate = (date: Date) => {
    var no = lastDayOfMonth(date).getDate();
    return no;
};

export const getDayDropList = (month: string, year: string) => {
    if (month === "" || year === "") {
        return [];
    }
    const day = new Date(parseInt(year), monthBefore[month], 1);
    var no = getLastDate(day);
    return Array.from(new Array(no), (v, i) => (
        <option key={i + 1} value={i + 1}>
            {i + 1}
        </option>
    ));
};

export const firstDayOfMonth = (date: Date): Date => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
};
export const lastDayOfMonth = (date: Date): Date => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
};

const getDaysBefore = (date: Date): Date[] => {
    date = firstDayOfMonth(date);
    const no = date
        .toLocaleDateString("ISO", { weekday: "long" })
        .toLowerCase();
    if (daysBefore[no] === 0) {
        return [];
    }
    const date2 = firstDayOfMonth(date);
    date2.setDate(0);
    date.setDate(-daysBefore[no] + 1);
    return getDaysArray(date, date2);
};

//Get all days of the given date's month + prev dates from sunday
export const daysMonth = (date: Date): Date[] => [
    ...getDaysBefore(date),
    ...getDaysArray(firstDayOfMonth(date), lastDayOfMonth(date)),
];

export const daysWeek = (date: Date): Date[] => {
    const no = date
        .toLocaleDateString("ISO", { weekday: "long" })
        .toLowerCase();
    const date2 = new Date(date);
    date.setDate(date.getDate() - daysBefore[no]);
    date2.setDate(date2.getDate() + 6 - daysBefore[no]);
    console.log(date + " " + date2);
    console.log(getDaysArray(date, date2));
    return getDaysArray(date, date2);
};
