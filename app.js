/* 

1- Fetch weather data from api

2- Get city input

3- Show weather based on given input

*/

require('dotenv').config()

const apiKey = process.env.API_KEY


const getData = async () => {
    try {

        const location = "New York"; // replace or make dynamic
        const date1 = "2024-04-01";
        const date2 = "2024-04-07";

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${apiKey}`)

        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)

    } catch (err) {
        console.error('Error fethcing weather data', err)
    }
}

getData()