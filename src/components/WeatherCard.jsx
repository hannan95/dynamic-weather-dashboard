import image from '../assets/location.png'
import {WeatherContext} from '../contexts/weatherContext.jsx'
import {useContext} from 'react'
import '../css/weatherCard.css'

// import {TempLine} from './TempLine.jsx'




import HourWeather from './HourWeather.jsx'
export default function WeatherCard({weather}){
        console.log('This is a second element',weather)
        const COL = 80   // width of each hour column, in px
        const LINE_H = 60 // height of the line area, in px
        const {isCelcius, setIsCelcius} = useContext(WeatherContext)
        const t = (c, f) => Math.round(isCelcius ? c : f)

        let now = new Date()
        const nextDay = now.getHours()

        const cityNow = weather.location.localtime_epoch;

        const upcoming = weather.forecast.forecastday
        .flatMap((day) => day.hour)
        .filter((h) => h.time_epoch + 3600 > cityNow)
        .slice(0, 24);

        return(
            <div className="container1">

                <div className="currentWeather"> 
                    <div className="main2">
                        <h2><img src={image} alt="T" />{weather.location.name}</h2>
                        <p className='temp'>{t(weather.current.temp_c, weather.current.temp_f)}°</p>
                        <h3>{weather.current.condition.text}</h3>
                        <div className="highLow">
                            <p>↑{t(weather.forecast.forecastday[0].day.maxtemp_c, weather.forecast.forecastday[0].day.maxtemp_c)}° / ↓{t(weather.forecast.forecastday[0].day.mintemp_c, weather.forecast.forecastday[0].day.mintemp_f)}°</p>
                        </div>
                        <h3>Feels like {t(weather.current.feelslike_c,weather.current.feelslike_f)}°</h3>

                    </div>
                </div>
                <div className="wholeDay">
                    <div className="box">

                        {upcoming.map((item) => (
                            <HourWeather key={item.time_epoch} item={item} />
                        ))}
                    </div>
                </div>
                
            </div>
        )        


}