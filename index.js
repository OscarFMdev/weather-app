const { readInput, inquirerMenu, pause }  = require("./helpers/inquirer.js");



const main = async () => {
  let opt;
  do {
    opt = await inquirerMenu();
    console.log({opt})

    if (opt !== 0) await pause();
  } while( parseInt(opt) !== 0)

}


main();