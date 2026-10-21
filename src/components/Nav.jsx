import '../css/Nav.css'

import {useContext, useRef} from 'react'
import {WeatherContext} from '../contexts/weatherContext.jsx'
export default function Nav(){

    const {isCelcius, setIsCelcius} = useContext(WeatherContext)

    

    function handleC(){
            console.log('clicked')
            setIsCelcius(true)
    }
    function handleF(){
            setIsCelcius(false)

    }


    return(
        <div className="nav">
            <div className="logo">Weather</div>
            <div className="toggle">
                <p className={`Celcius ${(isCelcius) ? 'active': ''}`}  onClick={handleC}>°C</p>
                <p className={`fehreinheit ${(!isCelcius) ? 'active': ''}` } onClick={handleF}>°F</p>

            </div>
        </div>
    )
}