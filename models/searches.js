const axios = require('axios');

class Searches {

  history = ["Mexico city", "Madrid", "Ontario"]

  constructor() {
    // TODO: 
  }

  get paramsMapBox() {
    return {
      'limit': 5,
      'language': 'en',
      'access_token': process.env.MAPBOXKEY
    }
  } 

  async city(place = '') {
    // HTTP request
    try {
      const args = {
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
        params: this.paramsMapBox
      }
      const instance = axios.create(args)
      const resp = await instance.get()
    
      return resp.data.features.map(place => ({
        id: place.id,
        placeName: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }));
    } catch (error) {
      return [];
    } 
  }

  async cityWeather (lat, lon) {
    try {
      const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERKEY}&units=metric`);

      const {temp, temp_min, temp_max,  } = weather.data.main;

      return {
        temp,
        temp_min,
        temp_min,
        temp_max,
        description: weather.data.weather[0].description
      }

    } catch (error) {
      console.log(error);
    }
  }

}


module.exports = Searches;