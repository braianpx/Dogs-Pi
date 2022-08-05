import React from 'react';
import ImgNull from '../../img/5.jpg';
import { Link } from 'react-router-dom';
import './Card.css';
import { addFavorite, deleteFavortite, getAllFavorites } from '../../redux/actions/index.js'
import { useDispatch } from 'react-redux';

const Card = ({ username, favoriteId, breedsFavorites, id, name, img, temperaments, height})=>{

const dispatch = useDispatch();

const confirmUser = () => {
    if(username && breedsFavorites)
    return true
    else return false
} 
    return (
        <>
        <div className='classCard'> 
        
            <div id='DivCardName'>
                <h3 className='classCardName'>{name}</h3>
                <button className={confirmUser()? 
                    breedsFavorites.filter(el=> el === String(id)).length > 0?'classDisLikeCards':'classLikeCards'
                    : 'classLikeCardsOff' }
                    onClick={()=>{ if(!confirmUser()){
                        alert("To access this feature, you must first log in")
                        }else{
                            dispatch(getAllFavorites(username));
                            breedsFavorites.filter(el=> el === String(id)).length > 0?
                            dispatch(deleteFavortite(id,favoriteId)):
                            dispatch(addFavorite(String(id)),getAllFavorites(username))
                        }
                    }}
                        > ♥ </button>
            </div>
            
                <Link to={`/home/breed/${id}`} id="linkBreedId">
            <div id='divImgCard'>
                <img className='classImgCard' src={img != null? img: ImgNull } alt='img_Dog'  />
            </div>
                <p className='classText' >{temperaments}</p>
                <p className='classText' >{height} kg</p>
                </Link>
            
        </div>
        </>
    )
}
export default Card;