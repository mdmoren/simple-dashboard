import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const mykey = `${process.env.REACT_APP_WEATHER_KEY}`;
          const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${mykey}&units=imperial`;
          const hours = 4;
          const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${mykey}&units=imperial&cnt=${hours}`;

          try {
            const response = await axios.get(API_ENDPOINT);
            setWeather(response.data);
            const forecastResponse = await axios.get(forecastEndpoint);
            setForecast(forecastResponse.data.list);
          } catch (error) {
            console.error(error);
          }
        });
      }
    };
    fetchWeather();
  }, []);
  return (
    <div
      className="
      flex relative w-full h-full justify-center items-center overflow-hidden
      "
    >
      <div className="absolute w-full h-full">
        {weather && forecast ? (
          <div className="flex flex-col md:flex-row h-full justify-center items-center p-5">
            <div className="flex h-full flex-col justify-center items-center text-[#eee] w-full md:w-4/5">
              <p>
                <span className="text-2xl">
                  {weather.name}, {weather.sys.country}
                </span>
              </p>
              <p className="mt-4 mb-2">
                <strong className="text-xl">{weather.main.temp}°F</strong>
              </p>
              <p className="text-center">
                <strong className="text-lg text-[#ffffffbb]">
                  {weather.weather[0].description}
                </strong>
              </p>
            </div>
            <div className="flex h-full w-full items-center justify-center text-xs md:text-md">
              <div className="flex m-4 w-full h-full overflow-y-scroll p-5">
                <div className=" flex w-full flex-col items-center justify-center">
                  {forecast.slice(0, 12).map((hourlyData, index) => (
                    <div key={index} className="my-2 group">
                      <span className="font-bold text-[#00000080] group-hover:text-[#000]">
                        {moment.unix(hourlyData.dt).format("h:mm a")} -{" "}
                      </span>
                      <span className="font-bold text-[#EEEEEE80] group-hover:text-[#EEE]">
                        {hourlyData.main.temp}°F,{" "}
                      </span>

                      <span className="font-bold text-[#EEEEEE80] group-hover:text-[#EEE]">
                        {hourlyData.weather[0].description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[#aaaaaa] text-center">Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
