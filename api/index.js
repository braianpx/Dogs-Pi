const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament } = require('./src/db')
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((apiDate)=>{
    const arrayTemp = apiDate.data.map( elem =>{
        return {
            temperament: elem.temperament
        }     
        })
        Temperament.bulkCreate(arrayTemp)
        .then((tempTotal)=>{
          console.log('temperaments preload successful')
         })
    })
    .catch(err=>{
      console.log(`there was an error in the preload of the temperaments, error:  ${err}` )
    })
  });
});
