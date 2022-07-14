
export default function validator(statee){
    let errors = {};  
    if(!statee.name){
        errors.name = "name is required"
    }
     else if(statee.name){
        if(statee.name.length > 25){
            errors.name = "the name exceeds 25 characters"
        }
            else if(/(?=.*[0-9])/.test(statee.name)){
                errors.name = "should not contain Numbers";
                        }else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(statee.name)){
                            errors.name = "must not contain special characters";
                        }
    }
    if(!statee.heightMin){
        errors.heightMin = "height min is required";
    } 
    else if(statee.heightMin){
        if(statee.heightMin.length > 3){
            errors.heightMin = "should not be more than 3 characters";
        }
        else if(/[a-zA-Z]/.test(statee.heightMin)){
            errors.heightMin = "should not contain letters";
        }else if(parseInt(statee.heightMin) > parseInt(statee.heightMax)){
            errors.heightMin = "height min cannot be greater than height max";
        }else if(/(?=.*[" "])/.test(statee.heightMin)){
            errors.heightMin = "should not contain spaces";  
        }else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(statee.heightMin)){
            errors.heightMin = "must not contain special characters";
    }
}
    if(!statee.heightMax){
        errors.heightMax = "height max is required";
    }
    else if(statee.heightMax){
            if(statee.heightMax.length > 3){
            errors.heightMax = "should not be more than 3 characters";
            }
            else if(/[a-zA-Z]/.test(statee.heightMax)){
                errors.heightMax = "should not contain letters";
            } else if(parseInt(statee.heightMax) < parseInt(statee.heightMin)){
                errors.heightMax = "height max cannot be less than height min";
            } else if(/(?=.*[" "])/.test(statee.heightMax)){
                errors.heightMax = "should not contain spaces";  
            }else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(statee.heightMax)){
                errors.heightMax = "must not contain special characters"; 
    }
    }
    if(!statee.weightMin){
        errors.weightMin = "weight min is required";    
    }
    else if(statee.weightMin){
        if(statee.weightMin.length > 3){
        errors.weightMin = "should not be more than 3 characters";
        }
        else if(/[a-zA-Z]/.test(statee.weightMin)){
            errors.weightMin = "should not contain letters";
        } else if(parseInt(statee.weightMin) > parseInt(statee.weightMax)){
            errors.weightMin = "weight min cannot be greater than weight max";
        }else if(/(?=.*[" "])/.test(statee.weightMin)){
            errors.weightMin = "should not contain spaces";  
        } else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(statee.weightMin)){
            errors.weightMin = "must not contain special characters";  
    }
    }
    if(!statee.weightMax){
        errors.weightMax = "weight max is required"
    } 
    else if(statee.weightMax){
        if(statee.weightMax.length > 3){
        errors.weightMax = "should not be more than 3 characters";
        }
        else if(/[a-zA-Z]/.test(statee.weightMax)){
            errors.weightMax = "should not contain letters";
        } else if(parseInt(statee.weightMin) > parseInt(statee.weightMax)){
            errors.weightMax = "weight max cannot be less than weight min";
        }else if(/(?=.*[" "])/.test(statee.weightMax)){
            errors.weightMax = "should not contain spaces";  
        }  else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(statee.weightMax)){
            errors.weightMax = "must not contain special characters";  
    }   
    }
    if(!statee.life_span){
        errors.life_span = "life span is required";
    }
    else if(Math.sign(statee.life_span) === -1){
        errors.life_span = "the number must not be negative";
    }else if(/[a-zA-Z]/.test(statee.life_span)){
        errors.life_span = "should not contain letters";
    }else if(/(?=.*[" "])/.test(statee.life_span)){
        errors.life_span = "should not contain spaces";  
    } else if(/(?=.*[(\][°¬|!#$%&-/()=?¡'¿/\/+~*}`{///^´¨/-/_/.:,;><@])/.test(statee.life_span)){
        errors.life_span = "must not contain special characters";  
        }
    
     if(statee.url){
            if(statee.url[0] !== "h"){
                errors.url = "Must be an http";
            }
            else if(statee.url[1] !=="t"){
                errors.url = "Must be an http";
            }
            else if(statee.url[2] !=="t"){
                errors.url = "Must be an http";
            }else if(statee.url[3] !=="p"){
                errors.url = "Must be an http";
            }else if(/(?=.*[" "])/.test(statee.url)){
                errors.url = "should not contain spaces";  
            }
    }
    if(statee.temperament.length === 0){
        errors.temperament = "1 temperament is required";
    }
            return errors;
}

