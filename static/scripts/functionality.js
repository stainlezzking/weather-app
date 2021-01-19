const form = document.querySelector("form")
const cityName = document.querySelector(".content header")
const timeOfDay = document.querySelector(".content .location_time_image_group img")
const searchbar = form.querySelector("#searchbar")
const weather = document.querySelector(".weather_text")
const temperature = document.querySelector(".temperature_text span")
const icon = document.querySelector(" #weatherCondIcon")
const key = "IGrTJtoMekGs04Yun0v79l9br9wKnIHl"


form.addEventListener("submit",function(event){
    event.preventDefault();
    let city = searchbar.value.trim()
    getCityKey(city)
    .then(data=>  getWeather(data))
    .then(data=>{
        UI(data)
         console.log(data)
    })
    form.reset()
    document.activeElement.blur()
})


const getCityKey = async function(city){
   let response =  await fetch("http://dataservice.accuweather.com/locations/v1/cities/search" + "?apikey="+ key + "&q=" + city)
   .then(data => data.json())
//    console.log(response[0])  
    return response[0]
}

const getWeather = async function(cityKeyObj){
    let response = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKeyObj.Key + "?apikey=" + key)
                         .then(data=> data.json())
                         
    return [response , cityKeyObj.EnglishName ]
}


const UI = function(obj){
    //  change the cityName text
        cityName.innerText = obj[1]

        // change the day and night
        obj[0][0].IsDayTime ? timeOfDay.setAttribute("src", "./static/day.svg") :timeOfDay.setAttribute("src", "./static/night.svg") ;

        // change weatherCondition
       icon.setAttribute("src", "static/icons/"+ obj[0][0].WeatherIcon+".svg")
       weather.innerText = obj[0][0].WeatherText
       temperature.innerText = obj[0][0].Temperature.Metric.Value
}