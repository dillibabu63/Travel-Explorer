const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(city) {
  const locationResponse = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  const locationData = await locationResponse.json();

  if (!locationData.results || locationData.results.length === 0) {
    throw new Error("Location not found");
  }

  const { latitude, longitude } = locationData.results[0];
  return getWeatherByCoords(latitude, longitude);
}

export async function getWeatherByCoords(latitude, longitude) {
  const weatherResponse = await fetch(
    `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,is_day`
  );

  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather");
  }

  const weatherData = await weatherResponse.json();
  return weatherData.current;
}

export function getWeatherCondition(weatherCode) {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light showers",
    81: "Showers",
    82: "Heavy showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Heavy thunderstorm",
  };
  return conditions[weatherCode] || "Unknown";
}

export function getWeatherIcon(weatherCode, isDay = 1) {
  if (weatherCode === 0) return isDay ? "☀️" : "🌙";
  if (weatherCode <= 2) return isDay ? "⛅" : "☁️";
  if (weatherCode === 3) return "☁️";
  if (weatherCode <= 48) return "🌫️";
  if (weatherCode <= 57) return "🌦️";
  if (weatherCode <= 67) return "🌧️";
  if (weatherCode <= 77) return "❄️";
  if (weatherCode <= 82) return "🌧️";
  if (weatherCode <= 86) return "🌨️";
  return "⛈️";
}
