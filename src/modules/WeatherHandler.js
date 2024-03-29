
export default class WeatherHandler {

    static async getWeatherData(location){
        const url = `http://api.weatherapi.com/v1/current.json?key=4f101a1e978a444bad990331242803&q=${location}&aqi=no`;

        try {
            const response = await fetch(url, {mode: "cors"});
            
            const data = await response.json();
            return data;
            
        } catch(err) {
            alert(err);
            return null;
        }
    
    }
}