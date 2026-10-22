import '../css/sunset.css'
export default function Sunset({weather}){
    return(
        <div className="sunset">
            <p className='one'> ☀ Don't miss the sunset</p>
            <p className='two'>Sunset will be at {weather.forecast.forecastday[0].astro.sunset}</p>
        </div>
    )
}