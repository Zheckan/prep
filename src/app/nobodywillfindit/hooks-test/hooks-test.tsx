'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { getOpenWeatherMapApiKey } from '../../../config/api-env';
import type { WeatherData } from '../../../types';

type WeatherSectionItem = {
  label: string;
  value: string;
};

type WeatherSection = {
  title: string;
  items: WeatherSectionItem[];
};

const formatCoordinate = (
  value: number,
  positiveHemisphere: string,
  negativeHemisphere: string
) => {
  const hemisphere = value >= 0 ? positiveHemisphere : negativeHemisphere;
  return `${Math.abs(value).toFixed(2)}°${hemisphere}`;
};

const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;

const kelvinToFahrenheit = (kelvin: number) => (kelvin - 273.15) * (9 / 5) + 32;

const formatTemperature = (kelvin: number) => {
  const celsius = kelvinToCelsius(kelvin);
  const fahrenheit = kelvinToFahrenheit(kelvin);
  return `${celsius.toFixed(1)}°C • ${fahrenheit.toFixed(1)}°F`;
};

const formatWindSpeed = (metresPerSecond: number) => {
  const kilometresPerHour = metresPerSecond * 3.6;
  const milesPerHour = metresPerSecond * 2.236_936_292_054_4;
  return `${metresPerSecond.toFixed(1)} m/s • ${kilometresPerHour.toFixed(1)} km/h • ${milesPerHour.toFixed(1)} mph`;
};

const toCardinal = (degrees: number) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const index = Math.round(degrees / 22.5) % directions.length;
  return directions[index];
};

const formatPressure = (hectopascals: number) => {
  const inchesOfMercury = hectopascals * 0.029_529_983_071_445;
  return `${hectopascals.toFixed(0)} hPa • ${inchesOfMercury.toFixed(2)} inHg`;
};

const formatVisibility = (metres: number) => `${(metres / 1000).toFixed(1)} km`;

const formatPercentage = (value: number) => `${value.toFixed(0)}%`;

const getTimezoneLabel = (timezoneOffsetSeconds: number) => {
  const totalOffsetMinutes = timezoneOffsetSeconds / 60;
  const sign = totalOffsetMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(totalOffsetMinutes);
  const offsetHours = Math.floor(absoluteMinutes / 60);
  const offsetMinutes = Math.round(absoluteMinutes % 60);

  return `UTC${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
};

const formatUnixTimestamp = (
  unixSeconds: number,
  timezoneOffsetSeconds: number
) => {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);

  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const sanitizeItems = (items: Array<WeatherSectionItem | undefined>) =>
  items.filter(
    (item): item is WeatherSectionItem =>
      item !== undefined && item.value.trim() !== ''
  );

const buildOverviewSection = (data: WeatherData): WeatherSection => {
  const coordinates = `${formatCoordinate(data.coord.lat, 'N', 'S')} · ${formatCoordinate(
    data.coord.lon,
    'E',
    'W'
  )}`;
  const conditions = data.weather
    .map((condition) => `${condition.main} (${condition.description})`)
    .join(', ');

  return {
    title: 'Overview',
    items: sanitizeItems([
      { label: 'Location', value: `${data.name}, ${data.sys.country}` },
      { label: 'Conditions', value: conditions },
      { label: 'Updated', value: formatUnixTimestamp(data.dt, data.timezone) },
      { label: 'Timezone', value: getTimezoneLabel(data.timezone) },
      { label: 'Coordinates', value: coordinates },
    ]),
  };
};

const buildTemperatureSection = (data: WeatherData): WeatherSection => ({
  title: 'Temperatures',
  items: sanitizeItems([
    { label: 'Current', value: formatTemperature(data.main.temp) },
    { label: 'Feels like', value: formatTemperature(data.main.feels_like) },
    { label: 'Low', value: formatTemperature(data.main.temp_min) },
    { label: 'High', value: formatTemperature(data.main.temp_max) },
  ]),
});

const buildAtmosphereSection = (data: WeatherData): WeatherSection => {
  const seaLevel = Number.isFinite(data.main.sea_level)
    ? `${data.main.sea_level.toFixed(0)} hPa`
    : undefined;
  const groundLevel = Number.isFinite(data.main.grnd_level)
    ? `${data.main.grnd_level.toFixed(0)} hPa`
    : undefined;

  return {
    title: 'Atmosphere',
    items: sanitizeItems([
      { label: 'Pressure', value: formatPressure(data.main.pressure) },
      { label: 'Humidity', value: formatPercentage(data.main.humidity) },
      { label: 'Visibility', value: formatVisibility(data.visibility) },
      { label: 'Cloud cover', value: formatPercentage(data.clouds.all) },
      seaLevel !== undefined
        ? { label: 'Sea level pressure', value: seaLevel }
        : undefined,
      groundLevel !== undefined
        ? { label: 'Ground level pressure', value: groundLevel }
        : undefined,
    ]),
  };
};

const buildWindSection = (data: WeatherData): WeatherSection => {
  const gustValue = Number.isFinite(data.wind.gust)
    ? formatWindSpeed(data.wind.gust)
    : undefined;

  return {
    title: 'Wind',
    items: sanitizeItems([
      { label: 'Speed', value: formatWindSpeed(data.wind.speed) },
      gustValue !== undefined
        ? { label: 'Gusts', value: gustValue }
        : undefined,
      {
        label: 'Direction',
        value: `${data.wind.deg.toFixed(0)}° ${toCardinal(data.wind.deg)}`,
      },
    ]),
  };
};

const buildSunSection = (data: WeatherData): WeatherSection => ({
  title: 'Sun',
  items: sanitizeItems([
    {
      label: 'Sunrise',
      value: formatUnixTimestamp(data.sys.sunrise, data.timezone),
    },
    {
      label: 'Sunset',
      value: formatUnixTimestamp(data.sys.sunset, data.timezone),
    },
  ]),
});

const buildMetadataSection = (data: WeatherData): WeatherSection => ({
  title: 'Metadata',
  items: sanitizeItems([
    { label: 'Station base', value: data.base },
    { label: 'City ID', value: data.id.toString() },
    { label: 'Response code', value: data.cod.toString() },
  ]),
});

const parseWeatherData = (data: WeatherData): WeatherSection[] =>
  [
    buildOverviewSection(data),
    buildTemperatureSection(data),
    buildAtmosphereSection(data),
    buildWindSection(data),
    buildSunSection(data),
    buildMetadataSection(data),
  ].filter((section) => section.items.length > 0);

const renderWeatherSections = (sections: WeatherSection[]): ReactNode => (
  <div className='flex flex-col gap-5'>
    {sections.map((section) => (
      <article
        className='rounded-xl border border-zinc-800/70 bg-zinc-900/80 p-4 shadow-black/30 shadow-lg'
        key={section.title}
      >
        <h2 className='font-semibold text-lg text-yellow-500'>
          {section.title}
        </h2>
        <dl className='mt-3 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2'>
          {section.items.map((item) => (
            <div
              className='flex flex-col gap-1'
              key={`${section.title}-${item.label}`}
            >
              <dt className='text-xs text-zinc-500 uppercase tracking-wide'>
                {item.label}
              </dt>
              <dd className='font-medium text-sm text-zinc-100'>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    ))}
  </div>
);

const getWeatherPanelContent = ({
  errorMessage,
  hasWeatherData,
  isLoading,
  sections,
}: {
  errorMessage: string | undefined;
  hasWeatherData: boolean;
  isLoading: boolean;
  sections: WeatherSection[];
}): ReactNode => {
  if (isLoading && !hasWeatherData) {
    return <p className='text-sm text-zinc-400'>Loading weather snapshot…</p>;
  }

  if (!hasWeatherData) {
    if (errorMessage !== undefined) {
      return <p className='text-red-400 text-sm'>{errorMessage}</p>;
    }

    return (
      <p className='text-sm text-zinc-400'>
        No weather data available right now.
      </p>
    );
  }

  const renderedSections = renderWeatherSections(sections);

  if (errorMessage !== undefined) {
    return (
      <div className='flex flex-col gap-4'>
        <p className='text-red-400 text-sm'>{errorMessage}</p>
        {renderedSections}
      </div>
    );
  }

  return renderedSections;
};

type TelemetryDetails = {
  cityIdentifier: ReactNode;
  stationBase: ReactNode;
  rawPayload: ReactNode;
};

const getTelemetryDetails = (
  data: WeatherData | undefined
): TelemetryDetails => {
  if (data === undefined) {
    return {
      cityIdentifier: null,
      stationBase: null,
      rawPayload: null,
    };
  }

  return {
    cityIdentifier: (
      <p>
        <span className='text-zinc-400'>City identifier:</span> {data.id}
      </p>
    ),
    stationBase: (
      <p>
        <span className='text-zinc-400'>Station base:</span> {data.base}
      </p>
    ),
    rawPayload: (
      <details className='rounded-xl border border-zinc-800/60 bg-zinc-950/70 p-4 text-xs text-zinc-400'>
        <summary className='cursor-pointer font-semibold text-sm text-yellow-500'>
          Raw payload
        </summary>
        <pre className='mt-3 max-h-64 overflow-x-auto whitespace-pre-wrap break-words text-[11px] text-zinc-300 leading-5'>
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    ),
  };
};

export default function HooksTest() {
  const [increaseLongitude, setIncreaseLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = getOpenWeatherMapApiKey();

  useEffect(() => {
    if (apiKey.trim() === '') {
      setWeatherData(undefined);
      setErrorMessage(
        'Weather API key is missing. Provide NEXT_PUBLIC_WEATHER_API in your environment file.'
      );
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const guarded = (callback: () => void) => {
      if (isCancelled) {
        return;
      }

      callback();
    };

    const hasExistingData = weatherData !== undefined;

    const fetchWeather = async () => {
      guarded(() => {
        if (!hasExistingData) {
          setIsLoading(true);
        }
      });

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=${increaseLongitude}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            `Weather API responded with status ${response.status}`
          );
        }

        const data = (await response.json()) as WeatherData;

        guarded(() => {
          setWeatherData(data);
          setErrorMessage(undefined);
        });
      } catch {
        guarded(() => {
          if (!hasExistingData) {
            setWeatherData(undefined);
          }
          setErrorMessage(
            'Unable to load weather information right now. Please try again later.'
          );
        });
      } finally {
        guarded(() => {
          if (!hasExistingData) {
            setIsLoading(false);
          }
        });
      }
    };

    fetchWeather();

    return () => {
      isCancelled = true;
    };
  }, [apiKey, increaseLongitude, weatherData]);

  const increaseLongitudeHandler = () => {
    setIncreaseLongitude((prev) => prev + 1);
  };

  const increaseLongitudeKeyDownHandler = (
    event: KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === ' ') {
      event.preventDefault();
      increaseLongitudeHandler();
    }
  };

  const parsedWeatherSections = useMemo(
    () => (weatherData !== undefined ? parseWeatherData(weatherData) : []),
    [weatherData]
  );

  const hasWeatherData = weatherData !== undefined;

  const weatherPanelContent = getWeatherPanelContent({
    errorMessage,
    hasWeatherData,
    isLoading,
    sections: parsedWeatherSections,
  });

  const { cityIdentifier, rawPayload, stationBase } =
    getTelemetryDetails(weatherData);

  return (
    <div className='flex min-h-screen flex-col gap-6 bg-zinc-950 px-6 py-8 text-zinc-100'>
      <header className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='font-semibold text-2xl text-yellow-500'>
            Weather Explorer
          </h1>
          <p className='text-sm text-zinc-400'>
            Live feed from OpenWeatherMap with on-demand longitude shifts.
          </p>
        </div>
        <button
          className='inline-flex items-center gap-3 rounded-md bg-yellow-500 px-4 py-2 font-semibold text-sm text-zinc-900 shadow-lg shadow-yellow-500/30 transition hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 active:bg-yellow-600'
          onClick={increaseLongitudeHandler}
          onKeyDown={increaseLongitudeKeyDownHandler}
          type='button'
        >
          <span>Increase longitude</span>
          <span className='rounded-full bg-zinc-900 px-2 py-0.5 font-semibold text-xs text-yellow-400'>
            {increaseLongitude}
          </span>
        </button>
      </header>

      <main className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)]'>
        <section className='rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur'>
          {weatherPanelContent}
        </section>

        <aside className='flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-black/40 shadow-xl backdrop-blur'>
          <h2 className='font-semibold text-lg text-yellow-500'>Telemetry</h2>
          <div className='space-y-2 text-sm text-zinc-300'>
            <p>
              <span className='text-zinc-400'>Longitude offset:</span>{' '}
              {increaseLongitude}
            </p>
            {cityIdentifier}
            {stationBase}
          </div>

          {rawPayload}
        </aside>
      </main>
    </div>
  );
}
