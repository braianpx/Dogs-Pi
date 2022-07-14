const axios = require('axios')
const { GET_BREEDS, GET_DETAIL_BREED, GET_BREEDS_FILTER, GET_TEMPERAMENTS,
     FILTER_CREATED, FILTER_EXISTING,FILTER_BY_TEMPERAMENT,FILTER_BY_AZ,
     FILTER_WEIGHT,GET_BREEDS_FOR_FILTER} = require('./actionTypes.js');
// , GET_BREEDS_FAVOURITES,
// POST_BREEDS_FAVOURITES, DELETE_BREEDS_FAVOURITES

export const getBreedsForFilter = () =>{
    return function(dispatch){
        return axios.get('http://localhost:3001/dogs')
        .then(data => {
            return dispatch({
                type:GET_BREEDS_FOR_FILTER,
                payload: data.data
            })
        }).catch(err=>{return err})
    }
}

export const getBreeds = () =>{
    return function(dispatch){
        return axios.get('http://localhost:3001/dogs')
        .then(data => {
            return dispatch({
                type: GET_BREEDS ,
                payload: data.data
            })
        }).catch(err=>{return err})
    }
}
export const getBreedsFilter = (name) =>{
    return async function(dispatch){
        try{ 
            const breeds = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                     type: GET_BREEDS_FILTER ,
                     payload: breeds.data
                 })
            }catch(err){
                return err          
            }        
        }
    }

export const getDetailBreed = (id) => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/dogs/${id}`)
        .then(data =>{
            dispatch({
                type: GET_DETAIL_BREED ,
                payload: data.data
            })
        }).catch(err=>{return err})
    }
}

export const postBreed = ({name,heightMin,heightMax,weightMin,weightMax,life_span,url,temperament}) => { 
    return axios.post("http://localhost:3001/dog",{
            name,
            height:{metric:heightMin + " - " + heightMax},
            weight:{metric:weightMin + " - " + weightMax},
            life_span:Number(life_span),
            image:{url:url},
            temperament:temperament,
        })
 .then(data => data)
 .catch(err =>  err)  
}

export const getTemperaments = () => {
    return function(dispatch){
        return axios.get('http://localhost:3001/temperament')
        .then(info => {
            dispatch({
                type:GET_TEMPERAMENTS ,
                payload: info.data
            })
        }).catch(err=>{return err})
    }
}

export const filterCdOrEg = (input) =>{
    return function (dispatch){
        if(input === "Created"){
        return dispatch({
            type: FILTER_CREATED,
        })
    }
    else if(input === "Existing"){
        return dispatch({
            type:FILTER_EXISTING,
        })
      }}
}

export const filterTemperament = (data)=>{
    return function(dispatch){
        return dispatch({
            type:FILTER_BY_TEMPERAMENT,
            payload:data,
        })
    }
}

export const filterAZ = (data) =>{
    return function(dispatch){
        return dispatch({
            type: FILTER_BY_AZ,
            payload: data,
        })
    }
}

export const filterByWeight = (data) =>{
    return function(dispatch){
        return dispatch({
            type:FILTER_WEIGHT,
            payload:data,
        })
    }
}