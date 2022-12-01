const { leerInput }  = require("./helpers/inquirer.js");



const main = async () => {
  const texto = await leerInput('Hello: ');

  console.log(texto)
}


main();