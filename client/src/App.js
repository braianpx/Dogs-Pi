import React from 'react';
import { Route } from 'react-router-dom';
import Introduction from './components/Introduction/Introduction.jsx';
import Home from './components/Home/Home.jsx';
import Breed from './components/Breed/Breed.jsx';
import Favourites from './components/Favourites/Favourites.jsx';
import CreateBreed from './components/CreateBreed/CreateBreed.jsx'
import './App.css';

function App() {
  return (
<React.Fragment>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/create_breed_dog' component={CreateBreed}/>
    <Route exact path='/' component={Introduction} />
    <Route axact path='/home/breed/:id' component={Breed} />
    <Route exact path='/favourites' component={Favourites}/>
</React.Fragment>
  );
}

export default App;
