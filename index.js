const { readInput, inquirerMenu, pause }  = require("./helpers/inquirer.js");
const Searches = require("./models/searches.js");


const main = async () => {
  const searches = new Searches()
  let opt;
  do {
    opt = await inquirerMenu();
    
    switch (opt) {
      case 1:
        // Show message
          const place = await readInput('City: ');
          searches.city(place)
        // Show cities

        // Select place

        // Weather

        // Show search result

        console.log('\nCity information\n');
        console.log('City: ', );
        console.log('Lat: ', );
        console.log('Lng: ', );
        console.log('Temperature: ', );
        console.log('Min: ', );
        console.log('Max: ', );


      break;
    
      default:
      
      break;
    }


    if (opt !== 0) await pause();
  } while( parseInt(opt) !== 0)

}


main();