import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoThunderstorm,
  IoMdSearch,
  IoMdThunderstorm,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsThunder,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const APIkey = "0f51199de52acf00f597315031c55e86";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Ghaziabad");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // console.log(inputValue)
  const handleSubmit = (e) => {
    console.log(inputValue);
    e.preventDefault();

    // if input value not empty

    if (inputValue !== "") {
      setLocation(inputValue);
    }

    // select input

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
  };

  // fetch
  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((er) => {
        setLoading(false);
        setErrorMsg(er);
      });
  }, [location]);
  console.log(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [errormsg]);

  // if data false

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-7xl animate-spin" />
        </div>
      </div>
    );
  }

  let icon;
  // console.log(data.weather(0).main);

  switch (data.weather[0]?.main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    default:
      icon = "NOt found";
  }

  const date = new Date();
  return (
    <div className="w-full h-screen bg-gradient bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errormsg && (
        <div className="w-full text-white text-center text-sm rounded-md capitalize font-semibold max-w-[90vw] lg:max-w-[450px] bg-pink-600 absolute top-2 lg:top-0">{`${errormsg.response.data.message}`}</div>
      )}
      <form className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-1">
        <div
          className={`${
            animate ? "myan" : "animate-none"
          } h-full relative flex items-center justify-between p-2`}
        >
          <input
            onChange={handleInput}
            type="text"
            placeholder="search by city or country..."
            className="flex-1 bg-transparent outline-none text-white text-xl pl-6 h-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center hover:transition-all duration-500 ease-in-out hover:bg-[#15abdd]"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top  */}
            <div className="flex items-center gap-x-5">
              <div className="text-[87px]">{icon}</div>
              <div>
                <div className="text-2xl font-semibold">
                  {data.name},{data.sys.country}
                </div>
                {/* date  */}

                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body  */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none font-light">
                  {Math.floor(data.main.temp)}
                </div>

                {/* celcius  */}

                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>

              {/* wether desc  */}

              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>

            {/* card bottom  */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000}km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels Like{" "}
                    <div className="flex ml-2">
                      {Math.floor(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div className="flex">
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
