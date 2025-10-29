'use client';

import type { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { getOpenWeatherMapApiKey } from '../../../config/api-env';

type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export default function HooksTest() {
  const [increaseLongitude, setIncreaseLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiKey = getOpenWeatherMapApiKey();

  useEffect(() => {
    if (apiKey.trim() === '') {
      setWeatherData(null);
      setErrorMessage(
        'Weather API key is missing. Provide NEXT_PUBLIC_WEATHER_API in your environment file.'
      );
      return;
    }

    let isCancelled = false;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=${increaseLongitude}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data: WeatherData) => {
        if (!isCancelled) {
          setWeatherData(data);
          setErrorMessage(null);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setWeatherData(null);
          setErrorMessage('Unable to fetch weather data.');
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [apiKey, increaseLongitude]);

  const increaseLongitudeHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setIncreaseLongitude((prev) => prev + 1);
  };

  return (
    <div className='absolute inset-0 flex w-full'>
      <div className='flex w-full flex-1'>
        {errorMessage !== null ? (
          <p className='mt-4 text-red-500'>{errorMessage}</p>
        ) : (
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        )}
      </div>
      <div className='flex w-full flex-1'>
        <button onClick={increaseLongitudeHandler} type='button'>
          Increase Longitude {increaseLongitude}
        </button>
      </div>
    </div>
  );
}
