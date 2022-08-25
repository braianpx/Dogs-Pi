import { GET_BREEDS, GET_DETAIL_BREED, GET_BREEDS_FILTER,
     GET_TEMPERAMENTS, FILTER_EXISTING, FILTER_CREATED,
     FILTER_BY_TEMPERAMENT, FILTER_BY_AZ,FILTER_WEIGHT,
     DELETE_USER, LOGIN_USER, GET_BREEDS_FAVORITES,
     POST_BREEDS_FAVORITES, DELETE_BREEDS_FAVORITES,LOG_OUT,
     } from '../actions/actionTypes'

const initialState ={
    breeds:[],
    detailBreed:{},
    breedsFavorites:[],
    temperaments:[],
    user:{username:localStorage.getItem("usToken")||false},
}

const rootReducer = (state = initialState, action) =>{
switch(action.type){
case GET_BREEDS:
return{
    ...state,
    breeds: action.payload 
}
case GET_DETAIL_BREED:
return{
    ...state,
    detailBreed: action.payload
}
case GET_BREEDS_FILTER:
    return{
        ...state,
        breeds: action.payload
    }
case GET_TEMPERAMENTS:
    return{
        ...state,
        temperaments: action.payload
    }
case FILTER_CREATED:
    return{
        ...state,
        breeds: state.breeds.filter((el) => !Number(el.id))
    }
case FILTER_EXISTING:
    return {
        ...state,
        breeds: state.breeds.filter((el) => Number(el.id))
    }
case FILTER_BY_TEMPERAMENT:
    return{
        ...state,
        breeds: action.payload
    }
case FILTER_BY_AZ:
    return{
        ...state,
        breeds: action.payload
    }
case FILTER_WEIGHT:
    return{
        ...state,
        breeds: action.payload
    }
case DELETE_USER:
    return{
        ...state,
        user:{username: false}
    }
case LOGIN_USER:
    return{
        ...state,
        user:{username: action.payload}
    }
case GET_BREEDS_FAVORITES:
    return{
        ...state,
        breedsFavorites: action.payload
    }
case POST_BREEDS_FAVORITES:
    return{
        ...state,
        breedsFavorites: [action.breedsFavorites[0],action.breedsFavorites[1].concat(action.payload),action.breedsFavorites[2]]
    }
case DELETE_BREEDS_FAVORITES:
    return{
        ...state,
        breedsFavorites: [action.breedsFavorites[0],action.breedsFavorites[1].filter(el => el !== action.payload),action.breedsFavorites[2]]
    }
case LOG_OUT:
    return{
        ...state,
        user:{username:action.payload}
    }
default:
return state;
}
}

export default rootReducer;