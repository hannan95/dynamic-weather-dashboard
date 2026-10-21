

import '../css/HourWeather.css'
export default function HourWeather({item}){

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

    return(
        <div className='hourWeather' key={item.time_epoch}>
            <p>{item.time.slice(11, 16)}</p>
            <p>{getWeatherEmoji(item.condition.code, item.is_day)}</p>
            <h4>{item.temp_c}°</h4>
        </div>
    )
}