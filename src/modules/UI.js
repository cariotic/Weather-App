import WeatherHandler from './WeatherHandler';

export default class UI {

    static loadHomepage() {
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
        UI.displayCurrentWeather(currentWeatherData);
        UI.displayForecast(forecastData);
    }
    
    static displayCurrentWeatherData(data) {
        const weatherContainer = document.querySelector('.weather-container');
        const locationName = document.querySelector('.location-name');
        const icon = document.querySelector('.todays-weather-icon');
        const temperature = document.querySelector('.todays-temperature');
        const description = document.querySelector('.todays-description');
        const feelsLike = document.querySelector('.todays-feels-like');
        const humidity = document.querySelector('.todays-humidity');
        const windSpeed = document.querySelector('.todays-wind-speed');

        weatherContainer.style.display = 'flex';
        locationName.textContent = data.location.name;
        icon.src = `https:${data.current.condition.icon}`;
        temperature.textContent = `${data.current.temp_c} °C`;
        description.textContent = data.current.condition.text;
        feelsLike.textContent = `${data.current.feelslike_c} °C`;
        humidity.textContent = `${data.current.humidity} %`;
        windSpeed.textContent = `${data.current.wind_kph} km/h`;
    }

    static displayCurrentWeather(data) {
        if(data === null){
            UI.displayLocationNotFound();
            return;
        }

        let delay = 400;
        const boxSection = document.querySelector('.box-section');
        const invalidLocationMessage = document.querySelector('.invalid-location');
        invalidLocationMessage.style.display = 'none';

        if(boxSection.style.height > '600px') {
            delay = 0;
        }

        boxSection.style.height = '620px';
        setTimeout(() => UI.displayCurrentWeatherData(data), delay);
    }

    static displayForecast(data) {
        if(data === null) {
            return;
        }

        UI.removeForecastData();
        const forecastSection = document.querySelector('.forecast-section');
        forecastSection.style.display = 'flex';
        const forecast = data.forecast.forecastday;
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
    
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeekNumber = new Date(day.date).getDay();
        const dayOfWeek = weekdays[dayOfWeekNumber];
        date.textContent = dayOfWeek;
        icon.src = `https:${day.day.condition.icon}`;
        temperature.textContent = `${day.day.avgtemp_c} °C`;

        dayContainer.append(date);
        dayContainer.append(icon);
        dayContainer.append(temperature);
        forecast.append(dayContainer);
    }

    static displayLocationNotFound() {
        const boxSection = document.querySelector('.box-section');
        const invalidLocationMessage = document.querySelector('.invalid-location');
        const weatherContainer = document.querySelector('.weather-container');
        const forecastSection = document.querySelector('.forecast-section');

        boxSection.style.height = '160px';
        invalidLocationMessage.style.display = 'block';
        weatherContainer.style.display = 'none';
        forecastSection.style.display = 'none';
    }

    static removeForecastData() {
        const forecastSection = document.querySelector('.forecast-section');
        forecastSection.innerHTML = '';
    }
}