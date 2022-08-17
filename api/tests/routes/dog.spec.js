/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, Temperament, Favorites, User , conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pugg',
  height: {metric:'12 - 21'},
  weight: {metric:'1 - 5'},
  life_span: '6',
  temperament:['Stubborn','Aloof']
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
  // beforeEach(async() => await Breed.sync({ force: false }));
  // beforeEach(async() => await Temperament.sync({ force: false }));
  // beforeEach(async() => await Favorites.sync({ force: false }));
     // beforeEach(async() => await User.sync({ force: true }));

  describe('GET /dogs/id', () =>{

    it('should get 200',  (done) =>{
       agent.get('/dogs/10').expect(200)
       .then(()=>done())
       .catch(()=>done(new Error('should get 200')))
    });

    it('should return data for a breed of dog', async() =>{
        let dog = await agent.get('/dogs/10').expect(200)
          expect(dog.body).to.deep.equal(dogId);
      });

    it('should get 404', (done)=>{
      agent.get('/dogs/1000000000').expect(404)
      .then(()=>done())
      .catch(()=>done(new Error('should get 404')))
    });
  });

  describe('GET /dogs',() => {

       it('should get 200', (done) =>{
        agent.get('/dogs').expect(200)
        .then(()=>done())
        .catch(()=>done(new Error('should get 200')))
      });
    

      it('should get 404 error', function(done){
       agent.get('/dogss').expect(404)
       .then(()=>done())
       .catch(()=>done(new Error('should get 404')))
      }); 
    });
 

  describe('POST /dog', () =>{

    it('should get 201 breed created',async () =>{
     let res = await agent.post('/dog')
      .send(dog)
      .expect(201)
      expect(res.body.data).to.equal('The dog breed was created successfully');
    });

    it('should 200 breed deleted',async()=>{
      await agent.delete('/dog').send({nameBreed:dog.name}).expect(200)
    });
     it('should get 401', async() =>{
      let res = await agent.post('/dog')
      .send({ name: 'Pugg', height:"1 - 3"})
      .expect(401)
      expect(res.body.data).to.equal("missing data")
    });
  });
  
  describe('POST /user',() =>{

    it('should get 201 user created',async()=>{
       let res = await agent.post('/user/register')
      .send({username: "prueba123", password:"salmon123"})
      .expect(201)
      expect(res.body.data).to.equal('The user was created successfully')
    });

    it('should get 401 missing data',async()=>{
      let res = await agent.post('/user/register')
     .send({username: "prueba123"})
     .expect(401)
     expect(res.body.data).to.equal('missing data')
   });

   it('should get 401 the username already exist',async()=>{
    let res = await agent.post('/user/register')
   .send({username: "prueba123",password:"salmon123"})
   .expect(401)
   expect(res.body.data).to.equal('The username prueba123 already exists')
   });

    it('should get 200 user login',async () =>{
      await agent.post('/user/logIn')
      .send({username: "prueba123", password:"salmon123"})
      .expect(200)
    });
  });
 describe('DELETE /user',()=>{

    it('should get 200 user delted',async()=>{
     let res = await agent.delete('/user/delete')
     .send({username:"prueba123"}) 
     .expect(200)
     expect(res.body.data).to.equal('The user was successfully deleted')
    });
  });
  describe('GET /temperament',()=>{

    it('should get 200 and the data should length of 120', async()=>{
     let res = await agent.get('/temperament')
     .expect(200)
     expect(res.body).to.have.lengthOf(124)
    });
  });
});

