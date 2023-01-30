import React, { useState, useEffect } from "react";

const DateCard = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const dateStr = date.toLocaleDateString("en-US", dateOptions);
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const timeStr = time.toLocaleTimeString("en-US", timeOptions);

  return (
    <div className="flex relative w-full h-full justify-center items-center">
      <div className="absolute flex w-full h-full flex-col justify-center items-center text-[#eeeeeeaa] hover:text-[#eee]">
        <div className="font-bold text-3xl md:text-7xl">{timeStr}</div>
        <div className="text-lg md:text-3xl">{dateStr}</div>
      </div>
    </div>
  );
};

export default DateCard;
