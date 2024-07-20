import CityData from "../../interfaces/city";
import WeatherData from "../../interfaces/weather";
import cities from "../../lib/city.list.json";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

let Cities = cities as CityData[];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { city_id } = context.query;
  const city = Cities.find(city => city.id.toString() === city_id);
  if (!city) {
    throw new Error("City not found");
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.WEATHER_API_KEY}&exclude=minutely&units=metric`;
  const res = await fetch(url);
  const weatherData: WeatherData = await res.json();
  if (!weatherData) {
    throw new Error("Weather data not found");
  }
  return {
    props: {
      city,
      weather: weatherData,
    },
  };
}

type Props = {
  city: CityData;
  weather: WeatherData;
};

export default function CityDetail({ city, weather }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <Head>
        <title>WeatherWise</title>
      </Head>
      <main className="mt-5 mx-5">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">WeatherWise</h1>
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          &larr; Home
        </Link>
        <div className="py-5">
          <div className="bg-green-500 rounded p-4 shadow-md">
            <div className="grid grid-cols-2">
              <div>
                <h2 className="text-2xl mb-4 text-white">
                  {city.name} ({city.country})
                </h2>
                <span className="font-medium text-lg text-white">
                  {weather.main.temp_max.toFixed(0)}&deg;C
                </span>
                &nbsp;
                <span className="text-gray-300 text-sm">
                  {weather.main.temp_min.toFixed(0)}&deg;C
                </span>
              </div>
              <div className="justify-self-end">
                <Image
                  loader={() => iconUrl}
                  src={iconUrl}
                  width={50}
                  height={50}
                  alt="Weather Icon"
                />
                <div className="text-white text-sm">
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
