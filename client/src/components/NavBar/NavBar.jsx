import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../SearchBar/SearchBar.jsx';
import { getBreeds, getAllFavorites } from '../../redux/actions/index'
import { connect } from 'react-redux';
import './NavBar.css'

class NavBar extends Component {

componentDidMount(){
  this.props.getAllFavorites(this.props.user.username);
}

render(){
    return (
        <header id="idHeader">
                 <nav id='idNav'>
                        <div id='idSearchNav'>
                            <Search />
                        </div>
                     <h1 id='idH1Nav'> The House Of The Dogs </h1>
                     <div className='classDivUlNav2'>
                      <ul className='classUlNav2'>
                        { this.props.user.username?
                        <li className='classliPi' onClick={()=>this.props.getBreeds()}><Link to={'/home/user'} className='linkToLi'>{this.props.user.username || "user" }</Link></li>
                          : null
                          }
                          
                          { !this.props.user.username?
                        <>
                        <li className='classliPi'><Link to='/home/session' className='linkToLi'> LogIn </Link></li>
                        <li className='classliPi'><Link to='/home/session' className='linkToLi'> SigIn </Link></li>
                        </>: null
                          }
                        </ul>
                      <ul className='classUlNav2'>
                        <li className='classliPi' 
                              onClick={()=>this.props.getBreeds()}>
                              <Link to='/home' className='linkToLi'> Home </Link></li>
                        <li className={this.props.user.username?'classliPi':'classliPiUser'}>
                              { this.props.user.username? 
                              <Link to={`/home/favorites/${this.props.user.username}`} className='linkToLi'> {this.props.user.username? `Favourites ${!this.props.breedsFavorites[1]? '0' : this.props.breedsFavorites[1].length} ` : 'Favourites'} </Link>
                              :
                              'Favourites'}</li>
                        <li className='classliPi'>
                              <Link to='/create_breed_dog' className='linkToLi'> Create Breed </Link></li> 
                      </ul>
                    </div>
                </nav>
        </header>

    )
  }
};

function mapStateToProps(state) {
    return {
      user: state.user,
      breedsFavorites:  state.breedsFavorites
    };
  }

export default connect(mapStateToProps,{ getBreeds , getAllFavorites })(NavBar);