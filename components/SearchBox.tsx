import React, { useEffect, useState } from "react";
import CityData from "../interfaces/city";
import Link from "next/link";

const MIN_CITY_CHARS = 3;

let timeoutId: ReturnType<typeof setTimeout>;
const debounce = (fn: Function, ms = 300) => {
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState<CityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/city/${inputValue}`);
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error(error);
      }
    };
    if (inputValue.length >= MIN_CITY_CHARS) {
      debounce(fetchData)();
    }
  }, [inputValue]);

  return (
    <div>
      <input
        className="bg-gray-200 p-2 rounded-lg w-64 mb-4"
        type="text"
        placeholder="City name"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {inputValue.length >= MIN_CITY_CHARS && (
        <ul className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
          {cities.map(city => (
            <li key={city.id} className="mb-2">
              <Link href={`/detail/${city.id}`} className="text-blue-500 hover:underline">
                {city.name}
                {city.state ? `, ${city.state}` : ""} ({city.country})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
