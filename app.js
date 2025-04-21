/* 

1- Fetch weather data from api

2- Get city input

3- Show weather based on given input

*/

const apiKey = '3XBBSAHBCG7N3NMAHR93NMPUE'


const getCurrentDate = () => {
    const today = new Date()
    const formattedData = today.toISOString().split('T')[0]
    return formattedData
}


const getCityInput = () => {
    let city = prompt('enter a city')
    return city
}

const getData = async () => {
    try {

        const location = getCityInput()
        const date1 = getCurrentDate()
        const date2 = getCurrentDate()

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${apiKey}`)

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()

        console.log(data)

    } catch (err) {
        console.error('Error fethcing weather data', err)
    }
}

getData()