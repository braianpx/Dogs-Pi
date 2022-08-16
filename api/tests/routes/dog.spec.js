/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, Favorites, User, Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pugg',
  height: '12 - 21',
  weight: '1 - 5',
  life_span: '6'
};
const dogId = { 
    weight: {
      imperial: "60 - 120",
      metric: "27 - 54"
    },
    height: {
      imperial: "22 - 27",
      metric: "56 - 69"
    },
    id: 10,
    name: "American Bulldog",
    breed_group: "Working",
    life_span: "10 - 12 years",
    temperament: "Friendly, Assertive, Energetic, Loyal, Gentle, Confident, Dominant",
    reference_image_id: "pk1AAdloG",
    image: {
      id: "pk1AAdloG",
      width: 1669,
      height: 1377,
      url: "https://cdn2.thedogapi.com/images/pk1AAdloG.jpg"
    }
}

describe('Dogs Api routes', () => {
  before( () =>  conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Breed.sync({ force: true }));
  describe('routes to dogs',()=>{
  describe('GET /dogs/id', () =>{
    it('should get 200',() =>{
      agent.get('/dogs/10').expect(200)
    });
    it('should return data for a breed of dog', () =>{
         agent.get('/dogs/10').expect(200).expect((res)=>{
          expect(res.body).to.deep.equal(dogId);
       });
      });
    it('should get 404', ()=>{
      agent.get('/dogs/1000000000').expect(404);
    });
  });
  describe('GET /dogs',() => {
       it('should get 200', () =>{
        agent.get('/dogs').expect(404);
   }); 
      it('should get 404 error',  function(){
       agent.get('/dogss').expect(204);
    });
  });
});
  describe('POST /dog', () =>{
    it('should get 404', async() =>{
       let res = await agent.post('/dog')
      .send({name:"DogiDo",height: '12 - 21',weight: '1 - 5' })
      .expect(401)
      expect(res.body.data).to.deep.equal("missing data")
    })
  })
});
