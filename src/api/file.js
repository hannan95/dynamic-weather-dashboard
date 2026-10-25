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

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error("Your browser doesn't support location"))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(`${pos.coords.latitude},${pos.coords.longitude}`),
      (err) => {
        if (err.code === 1) reject(new Error('Location permission was denied'))
        else if (err.code === 3) reject(new Error('Getting your location timed out'))
        else reject(new Error("Couldn't get your location"))
      },
      { timeout: 10000 }
    )
  })
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


