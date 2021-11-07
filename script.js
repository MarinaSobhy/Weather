let currentDay = document.getElementById('current')
let searchWord = document.getElementById('search');
let form = document.querySelector('.find-location');
let days = document.querySelectorAll('.forecast-content')
let dates = document.querySelectorAll('.date')

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


async function currentWeather(search = 'cairo') {
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c96d2646b55147b1aa9143753212609&q=${search}&days=3`);
    let data = await result.json();
    if (result.status == 200) {
        currentDay.innerHTML=`
        <div class="location">${data.location.name}</div>
        <div class="degree">
            <div class="num">${data.current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
            <img src="https://${data.current.condition.icon}" alt="" width="90">
            </div>
        </div>
        <div class="custom">${data.current.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">${data.current.humidity}%</span>
        <span><img src="images/icon-wind.png" alt="">${data.current.wind_kph} km/h</span>
        <span><img src="images/icon-compass.png" alt="">${data.current.wind_dir}</span>`;
 
        var dateObj=new Date(data.location.localtime);
        dates[0].innerHTML=` <p>${daysOfWeek[dateObj.getDay()]}</p>
        <p>${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}</p>`

        for(let i=1 ; i<3;i++){
            dates[i].innerHTML=` <p>${daysOfWeek[new Date(data.forecast.forecastday[i].date).getDay()]}`
            days[i].innerHTML = `
            <div class="forecast-icon">
            <img src="https://${data.forecast.forecastday[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${data.forecast.forecastday[i].day.condition.text}</div>`
        }
    }

}
currentWeather()
form.addEventListener('submit', function () {
    currentWeather(searchWord.value)
})

