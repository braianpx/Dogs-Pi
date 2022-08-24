const axios = require('axios')
const { GET_BREEDS, GET_DETAIL_BREED, GET_BREEDS_FILTER, GET_TEMPERAMENTS,
     FILTER_CREATED, FILTER_EXISTING,FILTER_BY_TEMPERAMENT,FILTER_BY_AZ,
     FILTER_WEIGHT,GET_BREEDS_FOR_FILTER, LOGIN_USER, DELETE_USER, 
     GET_BREEDS_FAVORITES, POST_BREEDS_FAVORITES, DELETE_BREEDS_FAVORITES,
     LOG_OUT,API_LOCAL} = require('./actionTypes.js');

const baseUrl = process.env.API_URL || API_LOCAL;

export const getBreedsForFilter = () =>{
    return function(dispatch){
        return axios.get(`${baseUrl}/dogs`)
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
        return axios.get(`${baseUrl}/dogs`)
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
            const breeds = await axios.get(`${baseUrl}/dogs?name=${name}`)
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
        return axios.get(`${baseUrl}/dogs/${id}`)
        .then(data =>{
            dispatch({
                type: GET_DETAIL_BREED ,
                payload: data.data
            })
        }).catch(err=>{return err})
    }
}

export const postBreed = ({name,heightMin,heightMax,weightMin,weightMax,life_span,url,temperament}) => { 
    return axios.post(`${baseUrl}/dog`,{
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
        return axios.get(`${baseUrl}/temperament`)
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


/////////////// User ////////////////

export const createUser = (signinForm) =>{
    return function(){    
    return axios({
            baseURL:`${baseUrl}/`,
            url: 'user/register',
            method: 'post',
            headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify(signinForm)
        })
        .then(data => data)
        .catch(err => err )
    }
}
export const logInUser = (signinForm) =>{
    return function(dispatch){
        return axios({
            baseURL: `${baseUrl}/`,
            url: 'user/logIn',
            method: 'post',
            headers: {
                "Content-Type": "application/json",
              },
            data: JSON.stringify(signinForm)
        })
        .then(data =>{
            dispatch({
                type: LOGIN_USER,
                payload:data.data.username,
            });
            localStorage.setItem("token",data.data.token)
            localStorage.setItem("usToken", data.data.username)
           return data;
        })
        .catch(err => err)
    }
}

export const deleteUser = () =>{
return function(dispatch){
    return axios({
        baseURL: `${baseUrl}/`,
        url: 'user/delete',
        method: 'delete',
        headers: {
            "Content-Type": "application/json",
          },
        data: JSON.stringify({username: localStorage.getItem("usToken")})
    }).then(data =>{
        dispatch({
            type: DELETE_USER,
        })
        localStorage.clear()
    })
    .catch(err => err)
    }
}


export const logOut = () =>{
    return function(dispatch){
         dispatch({
            type:LOG_OUT,
            payload: false
        })
        localStorage.clear()
    }
}



//////////////// Favorites /////////////

export const getAllFavorites = (username) =>{
    return function(dispatch){
        return axios({
            baseURL: `${baseUrl}`,
            url: `/favorites/${username}`,
            method: 'get',
            headers: {
            'Content-Type':'application/json',
            'Authorization' : "Bearer "+ localStorage.getItem("token")}
        }).then(data =>{
            dispatch({
                type: GET_BREEDS_FAVORITES,
                payload: data.data
            })
        })
        .catch(err =>{
            if(err.response.data.data === "TokenExpiredError: jwt expired"){
            dispatch({
                    type: LOG_OUT,
                    payload: false
                })
            localStorage.clear();
            alert("session expired")}
        })
    }
}

export const addFavorite = (idBreed)=>{
    return function(dispatch){
        return axios({
            baseURL: `${baseUrl}`,
            url: `/favorites`,
            method: 'post',
            headers: {
            'Content-Type':'application/json',
            'Authorization' : "Bearer "+ localStorage.getItem("token")},
            data:JSON.stringify({idBreed:idBreed})
        }).then(data =>{
            dispatch({
                type: POST_BREEDS_FAVORITES,
                payload: idBreed
            })
            return data.data;
        }).catch(err => err)
    } 
}

export const deleteFavortite =  (idBreed, idFavorite) =>{
    return function(dispatch){
      return axios({
            baseURL: `${baseUrl}`,
            url: `/favorites/delete`,
            method: 'delete',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : "Bearer "+ localStorage.getItem("token")},
            data:JSON.stringify({
                idBreed:idBreed,
                idFavorite:idFavorite
            })
        }).then(data =>{
            dispatch({
                type: DELETE_BREEDS_FAVORITES,
                payload: idBreed
                })
            return data.data
        }).catch(err => err)
    }
}

