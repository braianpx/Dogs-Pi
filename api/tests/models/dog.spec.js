const { Breed,Temperament, Favorites, User, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Models', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators Breed', () => {
    // beforeEach(() => Breed.sync({ force: true }));

    describe('Breed', () => {

      it('should return error ', (done) => {
        Breed.create({})
          .then(() => done(new Error('It requires a valid more datas')))
          .catch(() => done());
      });
      it('should not be created due to missing height and life_span', (done) => {
        Breed.create({ name: 'Pug', height:{metric: "1 - 2"}})
          .then(() => done(new Error('It requires a valid more datas')))
          .catch(() => done());
      });
      it('should work when its a valid all', (done) => {
        Breed.create({ name: 'Pug', height:{metric: "1 - 2"} , weight:{metric:"2 - 8"},life_span:"12"})
        .then(() => done())
        .catch(()=> done(new Error('missing data')))
      });
      it('should deleted breed', (done) => {
        Breed.destroy({where:{ name: 'Pug'}})
        .then(() => done())
        .catch(()=> done(new Error('missing data')))
      });
      it('should return the breed name', async () => {
        let breed = await Breed.create({ name: 'Pug', height:{metric: "1 - 2"} , weight:{metric:"2 - 8"},life_span:"12"})
        expect(breed.name).to.equal('Pug')
      });
      it('should deleted breed Pug of db', (done) => {
        Breed.destroy({where:{ name: 'Pug'}})
        .then(() => done())
        .catch(()=> done(new Error('missing data')))
      });
    });
  });
  describe('Validators User', () =>{
    // beforeEach(() =>  User.sync({ force: true }));

    describe('User', () =>{

      it('should not be created due to lack of username', (done) =>{
         User.create({password:"1230sd"})
         .then(() => done(new Error('username data is missing')))
         .catch(() => done())
      })
      it('should not be created due to lack of password', (done) =>{
        User.create({username:"testname"})
        .then(()=> done(new Error('password data is missing')))
        .catch(()=> done())
      });
      it('should create the user', (done) =>{
        User.create({username:"testname", password:"1230sd"})
        .then(()=> done())
        .catch(()=> done(new Error('there should be no possible error')))
      });
      it('should delete the user', (done) =>{
        User.destroy({where:{username:"testname"}})
        .then(()=> done())
        .catch(()=> done(new Error('there should be no possible error')))
      });
      it('should return the name of user', () =>{
          User.create({username:"testname2", password:"1230sd"})
         .then((user)=>{
          expect(user.username).to.equal("testname2")
        });
      });
      it('should delete the user testname2', (done) =>{
        User.destroy({where:{username:"testname2"}})
        .then(()=> done())
        .catch(()=> done(new Error('there should be no possible error')))
      });
    });
  });
  describe('Validators Temperament', () =>{
    // beforeEach(() => Temperament.sync({ force: true }));
  
    describe('Temperament',() => {

      it('should create the temperament without any problem', (done) =>{
        Temperament.create({name:"pacificc"})
        .then(() => done())
        .catch(() => done(new Error('there should be no mistake')))
     });
     it('should delete the temperament without any problem', (done) =>{
      Temperament.destroy({where:{name:"pacificc"}})
      .then(() => done())
      .catch(() => done(new Error('there should be no mistake')))
   });
     it('should return the name of temperament', async () =>{
      let temperament = await Temperament.create({name:"pacificc"})
      expect(temperament.name).to.equal("pacificc")
    });
    it('should delete the temperament of db', (done) =>{
      Temperament.destroy({where:{name:"pacificc"}})
      .then(() => done())
      .catch(() => done(new Error('there should be no mistake')))
   });
     it('should not be created due to lack of username', (done) =>{
      Temperament.create({})
      .then(() => done(new Error('name data missing')))
      .catch(() => done())
     });
    });
  });

  describe('Validators Favorites',()  => {
    // beforeEach(() => Favorites.sync({ force: true }));

    describe('Favorites',() => {

      it('should not be created due to lack of likes', (done) =>{
        Favorites.create({})
        .then(() => done(new Error('something is wrong with the likes')))
        .catch(() => done())
       });
       it('should create the favorite without any problem', (done) =>{
        Favorites.create({likes:["12","2","3"]})
        .then(() => done())
        .catch(() => done(new Error('there should be no mistake')))
       });
       it('should delete the temeperament of db', (done) =>{
        Favorites.destroy({where:{likes:["12","2","3"]}})
        .then(() => done())
        .catch(() => done(new Error('there should be no mistake')))
     });
     it('should return the name of temperament', async () =>{
      let favorite = await Favorites.create({likes:["12","2","3"]})
      expect(favorite.likes).to.deep.equal(["12","2","3"])
       });
       it('should delete the temeperament of db', (done) =>{
        Favorites.destroy({where:{likes:["12","2","3"]}})
        .then(() => done())
        .catch(() => done(new Error('there should be no mistake')))
     });
    });
  });
});
