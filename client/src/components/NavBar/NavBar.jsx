import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../SearchBar/SearchBar.jsx';
import { getBreeds } from '../../redux/actions/index'
import { connect } from 'react-redux';
import './NavBar.css'

class NavBar extends Component {

render(){
    return (
        <header id="idHeader">
                 <nav id='idNav'>
                     <div> 
                     <ul id='idUlNav'>
                        <li id='idLiAbout'><Link to='/about' id='linkabout'>about</Link></li>
                     </ul>
                        <div id='idSearchNav'>
                            <Search />
                        </div>
                     </div>
                   
                     <h1 id='idH1Nav'> The House Of The Dogs </h1>
                     <ul id='idUlNav2'>
                        <li className='classliPi' onClick={()=>this.props.getBreeds()}><Link to='/home' className='linkToLi'> Home </Link></li>
                        <li className='classliPi'><Link to='/favourites' className='linkToLi'> Favourites </Link></li>
                        <li className='classliPi'><Link to='/create_breed_dog' className='linkToLi'> Create Breed </Link></li>
                    </ul>
                </nav>
        </header>

    )
  }
};
export default connect(null,{ getBreeds })(NavBar);