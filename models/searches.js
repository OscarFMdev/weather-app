const fs = require('fs');

const axios = require('axios');

class Searches {

  history = [];
  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  get historyCapitalize() {
    return this.history.map(place => {
      let words = place.split(' ');
      words = words.map(word => word[0].toUpperCase() + word.substring(1));

      return words.join(' ');
    })
  }

  get paramsMapBox() {
    return {
      'limit': 5,
      'language': 'en',
      'access_token': process.env.MAPBOXKEY
    }
  } 

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHERKEY,
      units: 'metric'
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

      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
        params: {...this.paramsWeather, lat, lon}
      })

      const resp = await instance.get();

      const { main, weather } = resp.data;

      return {
        temp: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        description: weather[0].description
      }

    } catch (error) {
      console.log(error);
    }
  }

  addToHistory(place = '') {
    if(this.history.includes(place.toLowerCase())) {
      return
    }
    this.history = this.history.splice(0, 4)
    this.history.unshift(place.toLowerCase());

    this.writeInDB();

  }

  writeInDB() {
    const payload = {
      history: this.history
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {
    if(!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    this.history = data.history;
  }

}


module.exports = Searches;