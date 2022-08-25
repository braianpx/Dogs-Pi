import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Introduction from './components/Introduction/Introduction.jsx';
import Home from './components/Home/Home.jsx';
import Breed from './components/Breed/Breed.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import CreateBreed from './components/CreateBreed/CreateBreed.jsx';
import LoginAndSignUp from './components/LoginAndSignUp/LoginAndSignUp.jsx';
import User from './components/User/User.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import './App.css';
function App() {
  return (
<React.Fragment>
  <Routes>
    <Route exact path='/home/user' element={<User />} />
    <Route path='/home/session' element={<LoginAndSignUp />}/>
    <Route exact path='/home' element={<Home />}/>
    <Route exact path='/create_breed_dog' element={<CreateBreed />}/>
    <Route exact path='/' element={<Introduction />} />
    <Route exact path='/home/breed/:id' element={<Breed p/>} />
    <Route exact path='/home/favorites/:username' element={<Favorites />}/>
    <Route path='*' element={<NotFound />} />
  </Routes>
</React.Fragment>
  );
}

export default App;
