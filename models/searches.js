const axios = require('axios');

class Searches {

  history = ["Mexico city", "Madrid", "Ontario"]

  constructor() {
    // TODO: 
  }

  async city(place = '') {
    // HTTP request

    try {
      const results = await axios.get('https://reqres.in/api/users?page=2')
    
      console.log(results.data);
    
      console.log('city ',place);
    
      return [];
    } catch (error) {
      return [];
    } 
      
  }

}


module.exports = Searches;