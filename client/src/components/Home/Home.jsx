import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar.jsx';
import Cards from '../Cards/Cards.jsx';
import Filter from '../Filter/Filter.jsx';
import { getBreeds, getTemperaments } from '../../redux/actions/index';
import './Home.css'

const Home = () =>{

const dispatch = useDispatch();
const breeds = useSelector(state => state.breeds)
const temperaments = useSelector(state => state.temperaments)

const [page, setPage ] = useState(1);
const breedsForPage = 8;
const followingBreedsForPage = page * breedsForPage; 
const previousBreedsForPage = followingBreedsForPage - breedsForPage;
const limitForPage = Math.ceil(breeds.length/breedsForPage);
let breedsFilter = breeds;
const breedsPagination = breedsFilter.slice(previousBreedsForPage,followingBreedsForPage);


const page1 = () =>{
    setPage(1)
}

const followingPage = () => {
    if(page !== limitForPage)
    setPage(page + 1)
}
const previousPage = () =>{
    if(page !== 1)
    setPage(page - 1)
}

useEffect(()=>{
    dispatch(getBreeds());
    dispatch(getTemperaments());
},[])

    return(
        <div>
        <NavBar />
        <Filter page1={page1} temperaments={temperaments} breeds={breeds} />  
        <Cards breeds={breedsPagination} />
        {
        breeds.length > 0?
     <div className='classBtnPage'>
         <div className='classDivButton' >
         <button className='classButton1' onClick={()=> previousPage()}  > Previous </button>
         <button onClick={()=> previousPage()} className='classFlechaBtn1' ></button>
         </div>
         <h3 className='classH3' >{page}</h3>
         <h3 className='classH3' >{'of ' + limitForPage }</h3>
         <div className='classDivButton'>
         <button className='classButton2' onClick={()=>followingPage()} > Following </button>
         <button onClick={()=>followingPage()} className='classFlechaBtn2' ></button>
         </div>
     </div>: null
     }
       </div>
    )    
}

export default Home;