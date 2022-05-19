import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBreed } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import './Breed.css'

const Breeds = (props) => {
 
 
 const id = props.match.params.id;
 const dispatch = useDispatch();
 const detailBreed = useSelector(state => state.detailBreed);

 useEffect(()=>{
        dispatch(getDetailBreed(id));
    },[id])

console.log(detailBreed.id)
console.log(id)
return(
    <div>
    <NavBar />
    <div id='idDivBreedKey' key={detailBreed.id} >
        {  
        Object.keys(detailBreed).length === 0 || Number(id) !== Number(detailBreed.id) ?
                <div id='idDivBreed'>
                <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0712.gif" alt='git_dog' id='idImgBreed'/>
                <h1 id='idH1Breed'>Loading...</h1>
                </div>
                :
                <div id='idDivDetailBreed' >
                    <div id='idDivImageBreed'>
                    <img src={detailBreed.image.url} alt='img_dog_breed' id='idImageBreed' />
                    </div>
                    <div id='idDivBreedDetail'>
                    <h2 id='idH2Breed'>{detailBreed.name}</h2>
                    <p className='classPBreed'>{detailBreed.temperament}</p>
                    <p className='classPBreed'>height: {detailBreed.height.metric} cm</p>
                    <p className='classPBreed'>weight: {detailBreed.weight.metric} kg</p>
                    <p className='classPBreed'>life span: {detailBreed.life_span}</p>
                </div>
                </div>
        }
    </div>
    </div>
)
}

export default Breeds;