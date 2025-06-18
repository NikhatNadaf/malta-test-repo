import React from "react";
import Forcast from "./forecast";
import { Skeleton } from "@/components/ui/skeleton";

const dateBuilder = (d) => {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    this.getWeather(35.9375, 14.3754);
    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    // const api_call = await fetch(
    //   `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    // );
    // const data = await api_call.json();
    this.setState({ loading: true });

    try {
      const oneCallApi = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=80b8bc51de824911bc295834250301&q=${lat},${lon}&hours=48`
      );
      const oneCallData = await oneCallApi.json();

      const timezoneOffset = oneCallData.location.tz_id;
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: timezoneOffset,
      });
      const currentHour = new Date(currentTime).getHours();

      const hourlyData = oneCallData.forecast.forecastday[0].hour;

      const nextFourHoursData = hourlyData.filter((hour) => {
        const hourTime = new Date(hour.time).getHours();
        return hourTime >= currentHour && hourTime < currentHour + 4;
      });

      const nextFourHoursTemp = nextFourHoursData.map((hour) => {
        const date = new Date(hour.time);

        let hour12 = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hour12 >= 12 ? "PM" : "AM";

        hour12 = hour12 % 12;
        hour12 = hour12 ? hour12 : 12;

        const formattedTime = `${hour12.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} ${ampm}`;

        return {
          time: formattedTime,
          temperature: Math.round(hour.temp_c),
          conditionIcon: hour.condition.icon,
        };
      });

      this.setState({
        lat: lat,
        lon: lon,
        city: oneCallData?.location.name,
        temperatureC: Math.round(oneCallData?.current.temp_c),
        temperatureF: Math.round(oneCallData?.current.temp_f),
        humidity: oneCallData?.current.humidity,
        wind: oneCallData?.current.wind_kph,
        precipitation: oneCallData?.current.precip_in,
        // main: data.weather[0].main,
        country: oneCallData?.location.country,
        hourlyWeather: nextFourHoursTemp,
        loading: false,

        // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),

        // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.setState({ loading: false });
    } finally {
      this.setState({ loading: false });
    }
    // switch (this.state.main) {
    //   case "Haze":
    //     this.setState({ icon: "CLEAR_DAY" });
    //     break;
    //   case "Clouds":
    //     this.setState({ icon: "CLOUDY" });
    //     break;
    //   case "Rain":
    //     this.setState({ icon: "RAIN" });
    //     break;
    //   case "Snow":
    //     this.setState({ icon: "SNOW" });
    //     break;
    //   case "Dust":
    //     this.setState({ icon: "WIND" });
    //     break;
    //   case "Drizzle":
    //     this.setState({ icon: "SLEET" });
    //     break;
    //   case "Fog":
    //     this.setState({ icon: "FOG" });
    //     break;
    //   case "Smoke":
    //     this.setState({ icon: "FOG" });
    //     break;
    //   case "Tornado":
    //     this.setState({ icon: "WIND" });
    //     break;
    //   default:
    //     this.setState({ icon: "CLEAR_DAY" });
    // }
  };

  render() {
    return (
        <div className="flex max-lg:col-span-3 flex-col w-full border rounded-3xl h-full p-4 max-lg:space-y-4">
          {this.state.loading ? (
            <Skeleton className={"bg-gray-300 p-4 rounded-[3rem]"} />
          ) : (
            <div className="bg-gradient-to-r from-red-800 to-red-500 items-center text-white flex justify-between p-4 rounded-2xl">
              <span className="text-sm md:text-xl">
                {this.state.city}, {this.state.country}
              </span>
              <div className="text-sm md:text-xl">
                {dateBuilder(new Date())}
              </div>
            </div>
          )}
          <Forcast data={this.state} />
          {this.state.loading ? (
            <Skeleton className={"bg-gray-300 h-full rounded-3xl"} />
          ) : (
            <div className="bg-gradient-to-r from-black to-green-800 flex-col flex justify-center h-full rounded-3xl text-white lg:mt-5 p-4 lg:p-0">
              <h2 className="text-xl font-md pl-4">Today</h2>
              <div className="grid grid-cols-4">
                {this.state.hourlyWeather?.map((hour, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 py-4"
                  >
                    <p className="text-xs md:text-base font-thin">
                      {hour.time}
                    </p>
                    <img
                      src={`https:${hour.conditionIcon}`}
                      alt=""
                      className="w-10 h-10"
                    />
                    <p className="text-sm md:text-lg">
                      {Math.round(hour.temperature)}°C
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    );
  }
}

export default Weather;
