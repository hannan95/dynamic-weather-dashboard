const baseUrl = 'https://api.weatherapi.com'
const apiKey =  '757379751e3346a58f8130359262409'



export async function searchWeather(city){
    const res =  await fetch(`${baseUrl}/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
    const data = await res.json()
    return data
    
}

