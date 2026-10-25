import { useState, useEffect, useContext } from 'react'
import { getYesterdayWeather } from '../api/file.js'
import { WeatherContext } from '../contexts/weatherContext.jsx'
import '../css/forecast.css'

// Outside the component, so they aren't recreated on every render
const CONDITION_GROUPS = [
    { codes: [1000], day: "☀️", night: "🌙" },
    { codes: [1003], day: "⛅", night: "☁️" },
    { codes: [1006, 1009], day: "☁️", night: "☁️" },
    { codes: [1030, 1135, 1147], day: "🌫️", night: "🌫️" },
    { codes: [1063, 1150, 1153, 1180, 1183, 1240], day: "🌦️", night: "🌧️" },
    { codes: [1186, 1189, 1192, 1195, 1243, 1246], day: "🌧️", night: "🌧️" },
    { codes: [1072, 1168, 1171, 1198, 1201], day: "🌧️", night: "🌧️" },
    { codes: [1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1114, 1117], day: "🌨️", night: "🌨️" },
    { codes: [1069, 1204, 1207, 1249, 1252], day: "🌨️", night: "🌨️" },
    { codes: [1237, 1261, 1264], day: "🧊", night: "🧊" },
    { codes: [1087, 1273, 1276, 1279, 1282], day: "⛈️", night: "⛈️" },
    ];

function getWeatherEmoji(code, isDay) {
  const group = CONDITION_GROUPS.find((g) => g.codes.includes(code))
  if (!group) return '🌡️'
  return isDay ? group.day : group.night
}

function getWeekday(dateString, style = 'short') {
  return new Date(dateString + 'T00:00').toLocaleDateString('en-US', { weekday: style })
}

function DayRow({ label, day, isCelcius }) {
  const t = (c, f) => Math.round(isCelcius ? c : f)
  const night = day.hour?.[21] // 9 PM; yesterday's data has hours too

  return (
    <>
        <div className="dayRow">
            <p className="dayName">{label}</p>
            <div className="specs">

                <p className="dayRain">💧 {day.day.daily_chance_of_rain}%</p>
                <p className="dayIcon">{getWeatherEmoji(day.day.condition.code, 1)}</p>
                <p className="dayIcon">
                    {night ? getWeatherEmoji(night.condition.code, night.is_day) : ''}
                </p>
                <p className="dayTemps">
                    {t(day.day.maxtemp_c, day.day.maxtemp_f)}° {t(day.day.mintemp_c, day.day.mintemp_f)}°
                </p>
            </div>
            
        </div>
        {/* <hr /> */}
    </>

  )
}

export default function Forecast({ weather }) {
  const { isCelcius } = useContext(WeatherContext)
  const [yesterday, setYesterday] = useState(null)

  useEffect(() => {
    if (!weather) return

    async function fetchYesterday() {
      try {
        const data = await getYesterdayWeather(
          `${weather.location.lat},${weather.location.lon}`,
          weather.location.localtime
        )
        setYesterday(data)
      } catch (err) {
        setYesterday(null) // clear any previous city's data
        console.log('Yesterday unavailable:', err.message)
      }
    }

    fetchYesterday()
  }, [weather])

  return (
    <div className="forecast">
      {yesterday && (
        <DayRow label="Yesterday" day={yesterday} isCelcius={isCelcius} />
      )}

      {weather.forecast.forecastday.map((day, i) => (
        <DayRow
          key={day.date_epoch}
          label={i === 0 ? 'Today' : getWeekday(day.date)}
          day={day}
          isCelcius={isCelcius}
        />
        
      ))}
    </div>
  )
}

      