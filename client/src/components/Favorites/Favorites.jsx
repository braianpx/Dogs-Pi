import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { getAllFavorites } from '../../redux/actions/index.js';
import Cards from '../Cards/Cards.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import './Favorites.css';

const Favorites = () => {

const user = useSelector(state => state.user)
const breedsFavorites = useSelector(state => state.breedsFavorites)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getAllFavorites(user.username))
},[dispatch,user.username]);

if(!user.username){ 
    return <Navigate to="/home" />
}
    return(
        <>
            <NavBar />
                <div>
                   <div className='classDivCardsFavorite'>
                        <Cards breedsFavorites={breedsFavorites} breeds={breedsFavorites[2]} username={user.username}/>
                    </div>
                </div>
        </>
    )
}

export default Favorites;