/* 

1- Fetch weather data from api

2- Get city input

3- Show weather based on given input

*/

const apiKey = '3XBBSAHBCG7N3NMAHR93NMPUE'

let useCelsius = false

// Factory function for specific weather data
const weatherFactory = (data) => {
    const { address, days } = data
    const { datetime, tempmax, tempmin, conditions } = days[0]

    return {
        city: address,
        date: datetime,
        maxTemp: tempmax,
        minTemp: tempmin,
        summary: conditions
    }
}


const getCurrentDate = () => {
    const today = new Date()
    const formattedData = today.toISOString().split('T')[0]
    return formattedData
}

// For console

/* const getCityInput = () => {
    let city = prompt('enter a city')
    return city
} */

const getData = async (city) => {
    try {

        // For console
        /*
        const location = getCityInput()
        const date1 = getCurrentDate()
        const date2 = getCurrentDate()
        */

        const date = getCurrentDate()

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}/${date}?key=${apiKey}`)

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        const weatherInfo = weatherFactory(data)

        displayWeather(weatherInfo)

    } catch (err) {
        console.error('Error fethcing weather data', err)
    }
}

// Converting operation
const convertToCelsius = (f) => ((f - 32) * 5 / 9).toFixed(1)

const displayWeather = (info) => {

    const resultDiv = document.getElementById('weatherInfo')
    const unit = useCelsius ? '°C' : '°F'
    const maxTemp = useCelsius ? convertToCelsius(info.maxTemp) : info.maxTemp
    const minTemp = useCelsius ? convertToCelsius(info.minTemp) : info.minTemp

    resultDiv.innerHTML = `
        <h2>Weather in ${info.city} on ${info.date}</h2>
        <p>Max Temp: ${maxTemp}${unit}</p>
        <p>Min Temp: ${minTemp}${unit}</p>
        <p>Summary: ${info.summary}</p>
    `
}

document.getElementById('weatherForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.getElementById('cityInput').value
    getData(city)
})