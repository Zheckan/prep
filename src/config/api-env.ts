type NumericEnvOptions = {
  readonly fallback: number;
  readonly variableName: string;
};

const inferBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_API_BASE_URL'
    );
  }

  return 'http://localhost:3000/api';
};

const resolveBaseUrl = (): string => {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (rawBaseUrl === undefined || rawBaseUrl.trim() === '') {
    return inferBaseUrl();
  }

  return rawBaseUrl;
};

const parseNumericEnv = (
  rawValue: string | undefined,
  options: NumericEnvOptions
): number => {
  if (rawValue === undefined || rawValue.trim() === '') {
    return options.fallback;
  }

  const parsedValue = Number.parseInt(rawValue, 10);

  if (Number.isNaN(parsedValue)) {
    throw new Error(
      `Environment variable ${options.variableName} must be a valid integer`
    );
  }

  return parsedValue;
};

export type ApiEnv = {
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly internalServiceKey?: string;
  readonly paymentsServiceBaseUrl?: string;
};

export const apiEnv: ApiEnv = {
  baseUrl: resolveBaseUrl(),
  timeoutMs: parseNumericEnv(process.env.API_TIMEOUT_MS, {
    fallback: 10_000,
    variableName: 'API_TIMEOUT_MS',
  }),
  internalServiceKey: process.env.INTERNAL_SERVICE_API_KEY,
  paymentsServiceBaseUrl: process.env.PAYMENTS_SERVICE_BASE_URL,
};

export const getOpenWeatherMapApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;

  if (apiKey === undefined || apiKey.trim() === '') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'Missing required environment variable: NEXT_PUBLIC_WEATHER_API'
      );
    }

    return '';
  }

  return apiKey;
};
