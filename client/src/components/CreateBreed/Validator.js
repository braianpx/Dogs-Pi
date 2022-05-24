
export default function validator(statee){
    let state = {errors:{}}  
    if(!statee.name){
        state.errors.name = "name is required"
    }
     else if(statee.name){
        if(statee.name.length > 25){
            state.errors.name = "the name exceeds 25 characters"
        }
            else if(/(?=.*[0-9])/.test(statee.name)){
                state.errors.name = "Contains Numbers";
                        }
    }
    if(!statee.heightMin){
        state.errors.heightMin = "height min is required";
    } 
    else if(statee.heightMin){
        if(statee.heightMin.length > 3){
            state.errors.heightMin = "should not be more than 3 characters";
        }
        else if(/[a-zA-Z]/.test(statee.heightMin)){
            state.errors.heightMin = "Contains letters";
        }
    }
    if(!statee.heightMax){
        state.errors.heightMax = "height max is required";
    }
    else if(statee.heightMax){
            if(statee.heightMax.length > 3){
            state.errors.heightMax = "should not be more than 3 characters";
            }
            else if(/[a-zA-Z]/.test(statee.heightMax)){
                state.errors.heightMax = "Contains letters";
            }    
    }
    if(!statee.weightMin){
        state.errors.weightMin = "weight min is required";    
    }
    else if(statee.weightMin){
        if(statee.weightMin.length > 3){
        state.errors.weightMin = "should not be more than 3 characters";
        }
        else if(/[a-zA-Z]/.test(statee.weightMin)){
            state.errors.weightMin = "Contains letters";
        }    
    }
    if(!statee.weightMax){
        state.errors.weightMax = "weight max is required"
    } 
    else if(statee.weightMax){
        if(statee.weightMax.length > 3){
        state.errors.weightMax = "should not be more than 3 characters";
        }
        else if(/[a-zA-Z]/.test(statee.weightMax)){
            state.errors.weightMax = "Contains letters";
        }    
    }
    if(!statee.life_span){
        state.errors.life_span = "life span is required";
    }
    else if(Math.sign(statee.life_span) === -1){
        state.errors.life_span = "the number must not be negative";
    }
     if(statee.url){
            if(statee.url[0] !== "h"){
                state.errors.url = "Must be an http";
            }
            else if(statee.url[1] !=="t"){
                state.errors.url = "Must be an http";
            }
            else if(statee.url[2] !=="t"){
                state.errors.url = "Must be an http";
            }else if(statee.url[3] !=="p"){
                state.errors.url = "Must be an http";
            }
        }

            return state
}

