const baseUrl = 'https://api.weatherapi.com'
const apiKey =  '757379751e3346a58f8130359262409'
 
export async function searchWeather(city) {
  const params = new URLSearchParams({ key: apiKey, q: city, days: 3 })
  const url = `${baseUrl}/v1/forecast.json?${params}`

  try {
    const res = await fetch(url)

    const data = await res.json()

    if (!res.ok || data.error) {
      throw new Error(data.error?.message || 'Failed to load data...')
    }
    return data
  } catch (err) {
    throw err
  }
}





export async function getYesterdayWeather(city, localtime) {
  // localtime comes from your forecast response: weather.location.localtime
  const d = new Date(localtime.slice(0, 10) + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  const yesterday = d.toISOString().slice(0, 10); // "2026-10-20"

  const params = new URLSearchParams({ key: apiKey, q: city, dt: yesterday });
  const res = await fetch(`${baseUrl}/v1/history.json?${params}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || "Couldn't load yesterday's weather");

  return data.forecast.forecastday[0]; // same shape as a forecast day
}


