require('dotenv').config();
const axios = require('axios');
const { readInput, inquirerMenu, pause, placesList }  = require("./helpers/inquirer.js");
const Searches = require("./models/searches.js");

const main = async () => {
  const searches = new Searches()
  let opt;
  do {
    opt = await inquirerMenu();
    
    switch (opt) {
      case 1:
        // Show message
        const searchPlace = await readInput('City: ');
        // Show cities
        const places = await searches.city(searchPlace);
        
        // Select place
        const id = await placesList(places);
        if( id === '0') continue;
        const selectedPlace = places.find(place => place.id === id);

        // Save into search history
        searches.addToHistory(selectedPlace.placeName)
        
        // Weather
        const data = await searches.cityWeather(selectedPlace.lat, selectedPlace.lng);
        
        // Show search result
        console.clear();
        console.log('\nCity information\n');
        console.log('City: ', selectedPlace.placeName.green);
        console.log('Lat: ', selectedPlace.lat);
        console.log('Lng: ', selectedPlace.lng);
        console.log('Temperature: ', `${data.temp}°C`.green);
        console.log('Min: ', `${data.temp_min}°C`);
        console.log('Max: ', `${data.temp_max}°C`);
        console.log('Description: ', `${data.description}`);

      break;

      case 2:
        console.clear();
        console.log('=========================='.green);
        console.log('     Search history'.white);
        console.log('==========================\n'.green);
        searches.historyCapitalize.forEach((search, index) => {
          let idx = `${index + 1}.`
          console.log(`${idx.blue} ${search.yellow}`);
        });

      default:
      
      break;
    }


    if (opt !== 0) await pause();
  } while( parseInt(opt) !== 0)

}


main();