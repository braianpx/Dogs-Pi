import React from 'react';
import { Route } from 'react-router-dom';
import Introduction from './components/Introduction/Introduction.jsx';
import Home from './components/Home/Home.jsx';
import Breed from './components/Breed/Breed.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import CreateBreed from './components/CreateBreed/CreateBreed.jsx';
import LoginAndRegister from './components/LoginAndSigIn/LoginAndSigIn.jsx';
import User from './components/User/User.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
function App() {
  return (
<React.Fragment>
    <Route exact path='/home/user' component={User} />
    <Route exact path='/home/session' component={LoginAndRegister}/>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/create_breed_dog' component={CreateBreed}/>
    <Route exact path='/' component={Introduction} />
    <Route exact path='/home/breed/:id' component={Breed} />
    <Route exact path='/home/favorites/:username' component={Favorites}/>
    <Route exact path='/nav' component={NavBar}/>
</React.Fragment>
  );
}

export default App;
