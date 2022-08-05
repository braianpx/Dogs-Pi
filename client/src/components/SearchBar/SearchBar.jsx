import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBreedsFilter } from '../../redux/actions/index';
import './SearchBar.css'
const Search = () => {

const [input,setInput] = useState({
    breed: "",
});

const dispatch = useDispatch();

const handleOnSubmit = async (e) =>{ 
    e.preventDefault();
     dispatch(getBreedsFilter(input.breed)) 
    setInput({
        breed: "",
    })
}

const handleInputChange = (e) =>{
    setInput({
        breed: e.target.value
    })
}
    return(
        <div>
            <form id='idDivOriginSearch' onSubmit={(e)=> handleOnSubmit(e)}>
            <input id="idInputSearch" type='text'  autoComplete='off' placeholder='Breed Name' value={input.breed} onChange={(e)=> handleInputChange(e)}></input>
            <div className='classDivInputSub'>
            <input id="idInputSubmit" type="submit" value="Search" ></input>
            </div>
            </form>
        </div>  
    )
}
export default Search;