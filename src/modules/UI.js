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
        
        const data = await WeatherHandler.getWeatherData(location);
        console.log(data);
    }
    
}