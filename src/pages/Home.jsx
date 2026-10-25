import {useState, useEffect} from 'react'
import Search from '../components/Search.jsx'
import {searchWeather} from '../api/file.js'
import image from '../assets/location.png'
import '../css/Home.css'
import WeatherCard from '../components/WeatherCard.jsx'
import Sunset from '../components/Sunset.jsx'
import Forecast from '../components/Forecast.jsx'




export default function Home(){
    const [city, setCity] = useState('London')
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

    async function fetchData() {
        try {
        const data = await searchWeather('london')
        setWeather(data)
        } catch (err) {
        } finally {
        setLoading(false)
        }
    }
  fetchData()
}, [])

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const data = await searchWeather(city)
            setWeather(data)
            setError(null)
        }
        catch(err){
                setError(`${err.message} ...`)

        }
        finally{
            setLoading(false)
        }


    }
    
    return(
            
        <div className='Home'>

            <form className="form" onSubmit={handleSubmit}>
                <div className="group">
                    <svg onClick={handleSubmit} className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input placeholder="Enter city..." type="search" className="input" value={city} onChange={(e)=>{setCity(e.target.value)}}></input>
                </div>

            </form>

            {error ? (
            <p className="error">{error}</p>
            ) : loading && !weather ? (
            <h1>Loading...</h1>
            ) : (
            weather && (
                <>
                <div className="main">
                    <WeatherCard weather={weather} />
                    <div className="sky-shape"></div>
                </div>
                <div className="main2">
                    <Sunset weather={weather} />
                </div>
                <div className="main3">
                    <Forecast weather={weather} />
                </div>
                </>
            )
            )}






        </div>
    )
}