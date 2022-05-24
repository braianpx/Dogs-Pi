import React from 'react';
import ImgNull from '../../img/5.jpg';
import './Card.css';

const Card = ({name, img, temperaments, height})=>{
    return (
        <div className='classCard'>
            <div id='DivCardName'>
            <h3 className='classCardName'>{name}</h3>
            </div>
            <div id='divImgCard'>
            <img className='classImgCard' src={img != null? img: ImgNull } alt='img_Dog'  />
            </div>
            <p className='classText' >{temperaments}</p>
            <p className='classText' >{height} kg</p>
        </div>
    )
}
export default Card;