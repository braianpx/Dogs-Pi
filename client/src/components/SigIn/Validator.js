

function validatorRegister(userState){
let state = {errors:{}}

if(!userState.username){
    state.errors.username = "username is required"
}
 else if(userState.username){
    if(userState.username.length > 12){
        state.errors.username = "the username exceeds 12 characters"
    }
            else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(userState.username)){
                        state.errors.username = "must not contain special characters";
                    }
            else if(/(?=.*[" "])/.test(userState.username)){
                state.errors.username = "should not contain space";
            }
}
if(!userState.password){
    state.errors.password = "password is required";
}
else if(userState.password){
    if(userState.password.length > 15){
        state.errors.password = "the password exceeds 15 characters"
    }
    else if(/(?=.*[(\][°¬|!#%/()?¡'¿/\/~*}`{///^´¨/.:,;><])/.test(userState.password)){
        state.errors.password = "contains certain special characters that are not accepted";
    }
    else if(/(?=.*[" "])/.test(userState.password)){
        state.errors.password = "should not contain space";
    }
 }
 
if(!userState.repeatPassword){
    state.errors.repeatPassword = "repeat password is required"
}
 else if(userState.repeatPassword){
    if(userState.password.length > 15){
        state.errors.password = "the repeat password exceeds 15 characters"
    }
    else if(/(?=.*[(\][°¬|!#%/()?¡'¿/\/~*}`{///^´¨/.:,;><])/.test(userState.password)){
        state.errors.password = "contains certain special characters that are not accepted";
    }
    else if(/(?=.*[" "])/.test(userState.password)){
        state.errors.password = "should not contain space";
    }
    else if(userState.password !== userState.repeatPassword){
        state.errors.repeatPassword = "Passwords do not match";
    }
 }
 
return state;

}


export default validatorRegister;