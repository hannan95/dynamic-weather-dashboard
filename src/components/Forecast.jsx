
import { useState, useEffect } from 'react';
import {getYesterdayWeather} from '../api/file.js'
import '../css/forecast.css'

export default function Forecast({weather}){

    const [yesterday, setYesterday] = useState(null)

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
        const group = CONDITION_GROUPS.find(g => g.codes.includes(code));
        if (!group) return "🌡️"; // fallback for any new code
        return isDay ? group.day : group.night;
        }
    function getWeekday(dateString, style = "long") {
         return new Date(dateString + "T00:00").toLocaleDateString("en-US", {
         weekday: style,   // "long" gives Wednesday, "short" gives Wed
     });
    }

        useEffect(() => {
            if (!weather) return; // wait until the main weather has loaded

        async function fetchYesterday() {
            try {
            const data = await getYesterdayWeather(
                `${weather.location.lat},${weather.location.lon}`,
                weather.location.localtime
            );
            console.log("Yesterday's weather:", data);
            setYesterday(data);
            } catch (err) {
            console.log("Yesterday unavailable:", err.message);
            }
        }

        fetchYesterday();
        }, [weather]);


    return(
        <div className="forecast">
            <div className="yesterday">
                <h3>Yesterday</h3>
                {yesterday.day.maxtemp_c}° {yesterday.day.mintemp_c}°
            </div>
            <div className="today">
                <h3>Today</h3>
                <p>{weather.forecast.forecastday[0].day.maxtemp_c}° {weather.forecast.forecastday[0].day.mintemp_c}°</p>
                
            </div>
            {weather.forecast.forecastday.map((day) => (
                <div className="day" key={day.date}>
                    <h3>{day.date}</h3>
                    <h4>{getWeekday(`${day.date}`, 'short')}</h4>
                </div>
            ))}
        </div>
    )}