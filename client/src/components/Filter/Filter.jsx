import { filterCdOrEg, getBreeds, filterTemperament, filterAZ, filterByWeight} from "../../redux/actions/index"  
import { useDispatch } from "react-redux"
import './Filter.css'

const Filter = (props) =>{

const dispatch = useDispatch();    

const filterTemp = (input) => {
let dato = props.breeds.filter(el=>{if(el.temperament)if(el.temperament.includes(input)) return el })
const dato1 = []
props.breeds.forEach(el=>{
    if(el.temperaments){
         el.temperaments.forEach(elem=>{
            if(elem.name === input) dato1.push(el);
        })
    }
})
dato = dato.concat(dato1)
dispatch(filterTemperament(dato))
}
const filterName = (input) =>{
    if(input === "A-Z"){    
const filterByWeight = props.breeds.sort((a,b)=>{
    if(a.name > b.name){
        return 1
    }
    else if(a.name < b.name){
        return -1
    }else{
        return 0
    }
    })
    dispatch(getBreeds())
    .then(data=>{
        dispatch(filterAZ(filterByWeight)) 
    })
}
    else if(input === "Z-A"){
    const filterByWeight = props.breeds.sort((a,b)=>{
        a.name = a.name.toLowerCase();
        b.name = b.name.toLowerCase();
        if(a.name < b.name){
            return 1
        }
        else if(a.name > b.name){
            return -1
        }else{
            return 0
        } 
    })
    dispatch(getBreeds())
    .then(data=>{
        dispatch(filterAZ(filterByWeight)) 
    })    
}}

const filterWeight = (input) => {
if(input === "Highest"){
let filterByHeight = props.breeds.sort((a,b)=>{
    let val = a.weight.metric[0] + a.weight.metric[1];
    let val2 = b.weight.metric[0] + b.weight.metric[1];
    val = parseInt(val);
    val2 = parseInt(val2);

    if(val < val2){
        return 1
        }
    else if(val > val2){
        return -1
    }else{
        return 0
    } 
})
dispatch(getBreeds())
.then(data=> 
    dispatch(filterByWeight(filterByHeight))
)} 
else if(input === "Lowest"){
    const filterByHeight = props.breeds.sort((a,b)=>{
        let val = a.weight.metric[0] + a.weight.metric[1];
        let val2 = b.weight.metric[0] + b.weight.metric[1];
        if(val > val2){
            return 1
            }
        else if(val < val2){
            return -1
        }else{
            return 0
        } 
    })
    dispatch(getBreeds())
    .then(data=> 
        dispatch(filterByWeight(filterByHeight))
    )}
}

    return(       
        <div className="classDivFilterOrigin">
            <div className="classDivFilter">
            <select className="classSelectFilt" onChange={(e)=>filterTemp(e.target.value)}>
            <option className="classOptionFilt" disabled selected>Order By Temperament</option>
            {props.temperaments? 
            props.temperaments.map(el=>{
                return(
                    <option className="classOptionFilt" key={el.name} >{el.name}</option>
                    ) 
            })
            :null}
            </select>
            </div>
            <div className="classDivFilter">
            <select className="classSelectFilt" onChange={(e)=>{dispatch(getBreeds()).then(data=>{dispatch(filterCdOrEg(e.target.value))})}}>
            <option className="classOptionFilt" disabled selected value="Order By Breed" >Order By Breed </option>
            <option className="classOptionFilt" value="Existing">Existing</option>
            <option className="classOptionFilt" value="Created" >Created</option>
            </select>
            </div>
            <div className="classDivFilter">
                <select className="classSelectFilt" onChange={(e)=>{filterName(e.target.value)}} >
                    <option className="classOptionFilt" disabled selected>Order By Name Of Breed</option>
                    <option className="classOptionFilt" value="A-Z">A-Z</option>
                    <option className="classOptionFilt" value="Z-A" >Z-A</option>
                </select>
            </div>
            <div className="classDivFilter">
                <select className="classSelectFilt" onChange={(e)=>{filterWeight(e.target.value)}} >
                    <option className="classOptionFilt" disabled selected >Order By Weight</option>
                    <option className="classOptionFilt" value="Highest" >Highest To Lowest</option>
                    <option className="classOptionFilt" value="Lowest" >Lowest To Highest</option>
                </select>
            </div>
            </div>
    )
}
export default Filter;