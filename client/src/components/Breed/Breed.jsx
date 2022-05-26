import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBreed } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import ImgNull from '../../img/5.jpg';
import './Breed.css'

const Breeds = (props) => {
 
 
 const id = props.match.params.id;
 const dispatch = useDispatch();
 const detailBreed = useSelector(state => state.detailBreed);

 useEffect(()=>{
        dispatch(getDetailBreed(id));
    },[id])

const temp = String(detailBreed.temperaments ?detailBreed.temperaments.map(elem=>{ return elem.name}):detailBreed.temperament);

return(
    <div>
    <NavBar />
    <div id='idDivBreedKey' key={detailBreed.id} >
        {  
        Object.keys(detailBreed).length === 0 || String(id) !== String(detailBreed.id) ?
                <div id='idDivBreed'>
                <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0712.gif" alt='git_dog' id='idImgBreed'/>
                <h1 id='idH1Breed'>Loading...</h1>
                </div>
                :
                <div id='idDivDetailBreed' >
                    
                    <img src={detailBreed.image.url?detailBreed.image.url:ImgNull} alt='img_dog_breed' id='idImageBreed' />
                   
                    
                    <h2 id='idH2Breed'>{detailBreed.name}</h2>
                    <p className='classPBreed'>{temp}</p>
                    <p className='classPBreed'>height: {detailBreed.height.metric} cm</p>
                    <p className='classPBreed'>weight: {detailBreed.weight.metric} kg</p>
                    <p className='classPBreed'>life span: {detailBreed.life_span}</p>
                
                </div>
        }
    </div>
    </div>
)
}

export default Breeds;