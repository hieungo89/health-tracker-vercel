import { Button } from "@components/Button";
import { Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Calendar = () => {
  const [monthCalendar, setMonthCalendar] = useState([]);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [daysOfWeek, setDaysOfWeek] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const smScreen = useMediaQuery("(max-width: 639px)");

  const months = [
    "January",
    "February",
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

  const generateCalendarWeeks = () => {
    let monthFirstDayIndex = new Date(year, month, 1).getDay();
    let currMonthLastDate = new Date(year, month + 1, 0).getDate();
    let monthLastDayIndex = new Date(year, month, currMonthLastDate).getDay();
    let prevMonthLastDate = new Date(year, month, 0).getDate();
    const allMonthDays = [];

    for (let i = monthFirstDayIndex; i > 0; i--)
      allMonthDays.push(prevMonthLastDate - i + 1);

    for (let i = 1; i <= currMonthLastDate; i++) allMonthDays.push(i);

    for (let i = monthLastDayIndex; i < 6; i++) {
      allMonthDays.push(i - monthLastDayIndex + 1);
    }

    const pages = Math.ceil(allMonthDays.length / 7);
    const calendarArr = [];

    for (let i = 0; i < pages; i++) {
      const diff = 7 * i;
      calendarArr.push(allMonthDays.slice(diff, diff + 7));
    }

    return setMonthCalendar(calendarArr);
  };

  const handleChangeMonth = (move) => {
    // Go back to the previous year
    if (month === 0 && move === "previous") {
      setYear((prev) => prev - 1);
      setMonth(11);
      return;
    }
    // Go forward to the next year
    if (month === 11 && move === "next") {
      setYear((prev) => prev + 1);
      setMonth(0);
      return;
    }

    return move === "next"
      ? setMonth((prev) => prev + 1)
      : setMonth((prev) => prev - 1);
  };

  useEffect(() => {
    generateCalendarWeeks();
  }, [month]);

  //* Heading based on screen size
  useEffect(() => {
    if (smScreen)
      return setDaysOfWeek(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    if (!smScreen)
      return setDaysOfWeek([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
  }, [smScreen]);

  const doSomething = () => {
    console.log("day clicked ");
  };

  return (
    <div className="p-8 text-center md:text-sm sm:text-xs overflow-auto">
      <p className="flex justify-between">
        <Button
          content="previous"
          handleClick={(e) => handleChangeMonth(e.target.innerHTML)}
        />
        <h3 className="w-[-webkit-fill-available] md:text-h4">{`${months[
          month
        ]?.toUpperCase()} ${year}`}</h3>
        <span></span>
        <Button
          content="next"
          handleClick={(e) => handleChangeMonth(e.target.innerHTML)}
        />
      </p>
      <Table
        aria-label="calendar"
        className="bg-grey-80"
        compact
        lined
        bordered
      >
        <Table.Header columns={daysOfWeek}>
          {daysOfWeek.map((day) => {
            return (
              <Table.Column
                key={day}
                css={{ textAlign: "center", width: "6rem" }}
              >
                {day}
              </Table.Column>
            );
          })}
        </Table.Header>
        <Table.Body>
          {monthCalendar?.map((week, index) => (
            <Table.Row key={index}>
              {week.map((day, index) => {
                return (
                  <Table.Cell key={index + day}>
                    <button
                      onClick={(e) => doSomething(e.target.innerHTML)}
                      className="w-full"
                    >
                      {day}
                    </button>
                  </Table.Cell>
                );
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Calendar;
