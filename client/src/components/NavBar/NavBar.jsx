import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

class NavBar extends Component {

render(){
    return (
        <header id="idHeader">
                 <nav id='idNav'>
                    <ul id='idUlNav'>
                        <li id='idLiAbout'><Link to='/about' id='linkabout'>about</Link></li>
                    </ul>
                     <h1 id='idH1Nav'> The House Of The Dogs </h1>
                     <ul id='idUlNav2'>
                        <li className='classliPi'><Link to='/home' className='linkToLi'> Home </Link></li>
                        <li className='classliPi'><Link to='/favorites' className='linkToLi'> Favourites </Link></li>
                        <li className='classliPi'><Link to='/create_dog' className='linkToLi'> Create Dog </Link></li>
                    </ul>
                </nav>
        </header>

    )
  }
};
export default (NavBar);