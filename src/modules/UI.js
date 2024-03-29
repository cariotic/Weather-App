// import background from '../assets/background.jpg';
import WeatherHandler from './WeatherHandler';

export default class UI {

    static loadHomepage() {
        // const img = new Image();
        // img.src = background;

        // const page = document.querySelector('body');
        // page.style.backgroundImage = `url('${background}')`;
        // page.style.backgroundRepeat = 'no-repeat';
        // page.style.backgroundSize = 'cover';
        // page.style.backgroundPosition = 'center top';

        UI.initSearchButton();
    }

    static initSearchButton() {
        const searchBtn = document.querySelector('.fa-magnifying-glass');
        searchBtn.addEventListener('click', UI.searchLocation);
    }

    static async searchLocation() {
        const location = document.querySelector('.searchbar').value;
        
        if(location === '') {
            alert('You have to enter a location');
            return;
        }
        
        const currentWeatherData = await WeatherHandler.getCurrentWeather(location);
        const forecastData = await WeatherHandler.getWeatherForecast(location);
        console.log(currentWeatherData);
        console.log(forecastData);
        UI.displayCurrentWeather(currentWeatherData);
        UI.displayForecast(forecastData);
    }
    
    static displayCurrentWeather(data) {
        if(data === null){
            return;
        }

        const weatherContainer = document.querySelector('.weather-container');
        const locationName = document.querySelector('.location-name');
        const icon = document.querySelector('.todays-weather-icon');
        const temperature = document.querySelector('.todays-temperature');
        const description = document.querySelector('.todays-description');

        weatherContainer.classList.add('visible');
        locationName.textContent = data.location.name;
        icon.src = `https:${data.current.condition.icon}`;
        temperature.textContent = `${data.current.temp_c} °C`;
        description.textContent = data.current.condition.text;
    }

    static displayForecast(data) {
        if(data === null) {
            return;
        }

        const forecast = data.forecast.forecastday;
        console.log(typeof forecast);
        forecast.forEach(day => UI.displayWeather(day));
    }

    static displayWeather(day) {
        const forecast = document.querySelector('.forecast-section');
        const dayContainer = document.createElement('div');
        const date = document.createElement('p');
        const icon = document.createElement('img');
        const temperature = document.createElement('p');

        dayContainer.classList.add('day-container');
        date.classList.add('date');
        icon.classList.add('weather-icon');
        temperature.classList.add('temperature');
    
        date.textContent = day.date;
        icon.src = `https:${day.day.condition.icon}`;
        temperature.textContent = `${day.day.avgtemp_c} °C`;

        dayContainer.append(date);
        dayContainer.append(icon);
        dayContainer.append(temperature);
        forecast.append(dayContainer);
    }
}