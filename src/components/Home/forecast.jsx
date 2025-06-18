import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { Umbrella, Droplets, Wind } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Tilt from "react-parallax-tilt";

function Forcast(props) {
  // const [query, setQuery] = useState("");
  // const [error, setError] = useState("");
  // const [weather, setWeather] = useState({});

  // const search = (city) => {
  //   axios
  //     .get(
  //       `${apiKeys.base}weather?q=${
  //         city != "[object Object]" ? city : query
  //       }&units=metric&APPID=${apiKeys.key}`
  //     )
  //     .then((response) => {
  //       setWeather(response.data);
  //       setQuery("");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setWeather("");
  //       setQuery("");
  //       setError({ message: "Not Found", query: query });
  //     });
  // };

  // useEffect(() => {
  //   search("valleta");
  // }, []);

  return (
    <>
      {props?.data?.loading ? (
        <Skeleton className={"bg-gray-300 h-full rounded-3xl my-4"} />
      ) : (
        
          <div className="p-3 lg:p-6 h-full flex flex-col justify-center bg-gradient-to-r from-red-800 to-red-500 mt-2.5 rounded-3xl">
            <ul>
              <div className="text-white">
                <div className="flex justify-evenly">
                  <img
                    className="object-cover rounded-full h-11 md:h-16"
                    src={props?.data?.hourlyWeather?.[0]?.conditionIcon}
                  />
                  <p className="flex text-5xl md:text-7xl">
                    {props?.data.temperatureC}°<span>C</span>
                  </p>
                </div>
                <Separator className="my-2" />
                <div className="max-lg:text-sm flex flex-row justify-evenly items-center">
                  <li className="flex flex-col items-center space-y-1">
                    <Umbrella />
                    <span className="temp text-lg md:text-2xl pb-1">
                      {props?.data?.precipitation}%
                    </span>
                    Precipitation
                  </li>
                  <li className="max-lg:text-sm flex flex-col items-center space-y-1">
                    <Droplets />
                    <span className="temp text-lg md:text-2xl pb-1">
                      {props?.data?.humidity}%
                    </span>
                    Humidity{" "}
                  </li>
                  <li className="max-lg:text-sm flex flex-col items-center space-y-1">
                    <Wind />
                    <span className="temp text-lg md:text-2xl pb-1">
                      {props?.data?.wind} Km/h
                    </span>
                    Wind Speed{" "}
                  </li>
                </div>
              </div>
            </ul>
          </div>
        
      )}
    </>
  );
}
export default Forcast;
