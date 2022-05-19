const axios = require('axios')
const { GET_BREEDS, GET_DETAIL_BREED } = require('./actionTypes.js');
// , PUT_BREED, GET_BREEDS_FAVOURITES,
// PUT_BREEDS_FAVOURITES, DELETE_BREEDS_FAVOURITES

export const getBreeds = () =>{
    return function(dispatch){
        return axios.get('http://localhost:3001/dogs')
        .then(data => {
             dispatch({
                type: GET_BREEDS ,
                payload: data.data
            })
        })
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
        })
    }
}