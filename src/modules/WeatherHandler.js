
export default class WeatherHandler {

    static async getCurrentWeather(location){
        const url = `http://api.weatherapi.com/v1/current.json?key=4f101a1e978a444bad990331242803&q=${location}&aqi=no`;

        try {
            const response = await fetch(url, {mode: 'cors'});

            if(response.status === 200) {
                const data = await response.json();
                return data;
            }
            else {
                throw new Error(response.status);
            }
            
        } catch(error) {
            return null;
        }
    }

    static async getWeatherForecast(location) {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=4f101a1e978a444bad990331242803&q=${location}&days=3&aqi=no&alerts=no`;

        try {
            const response = await fetch(url, {mode: 'cors'});

            if(response.status === 200) {
                const data = await response.json();
                return data;
            }
            else {
                throw new Error(response.status);
            }

        } catch(error) {
            return null;
        }
    }
}