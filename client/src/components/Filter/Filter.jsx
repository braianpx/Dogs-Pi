import { filterCdOrEg, getBreeds, filterTemperament,
     filterAZ, filterByWeight,getBreedsForFilter} from "../../redux/actions/index"; 
import { useDispatch } from "react-redux";
import './Filter.css'

const Filter = (props) =>{

const dispatch = useDispatch();

const filterTemp =  (input) => { 
if(input === 'All') dispatch(getBreeds()) 
else   
dispatch(getBreedsForFilter()).then(data =>{
    console.log(data)
    let dato = data.filter(el=> el.temperament?.includes(input))
    const dato1 = []
    data.forEach(el=>{
        if(el.temperaments){
             el.temperaments.forEach(elem=>{
                if(elem.name === input) dato1.push(el);
            })
        }   
    })
    dato = dato.concat(dato1)
    dispatch(filterTemperament(dato))
    props.page1() 
    })
};

const filterName = (input) =>{
    dispatch(getBreeds())
    .then((data)=>{
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
    dispatch(filterAZ(filterByWeight)) 
    props.page1();
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
        dispatch(filterAZ(filterByWeight));
        props.page1();     
        }   
    }) 
}

const filterWeight = (input) => {
    dispatch(getBreeds()).then(data=>{
if(input === "Highest"){
    let filterByHeight = props.breeds.sort((a,b)=>{
    let val = a.weight.metric[0] + a.weight.metric[1];
    let val2 = b.weight.metric[0] + b.weight.metric[1];
    let value = a.weight.metric[a.weight.metric.length -1] + a.weight.metric[a.weight.metric.length -2];
    let value2 = b.weight.metric[b.weight.metric.length -1] + b.weight.metric[b.weight.metric.length -2];
    val = parseInt(val);
    val2 = parseInt(val2);
    if(val < val2){
        return 1
        }
    else if(val > val2){
        return -1
    }else if(value > value2){
        return 1
    } else if(value2 > value){
        return -1
    }else{
        return 0
    }  
}) 
    dispatch(filterByWeight(filterByHeight))
    props.page1()
}
else if(input === "Lowest"){

    const filterByHeight = props.breeds.sort((a,b)=>{
        let val = a.weight.metric[0] + a.weight.metric[1];
        let val2 = b.weight.metric[0] + b.weight.metric[1];
        let value = a.weight.metric[a.weight.metric.length -1] + a.weight.metric[a.weight.metric.length -2];
        let value2 = b.weight.metric[b.weight.metric.length -1] + b.weight.metric[b.weight.metric.length -2];
        val = parseInt(val);
        val2 = parseInt(val2);
        value = parseInt(value);
        value2 = parseInt(value2);
        
        if(val > val2){
            return 1
            }
        else if(val < val2){
            return -1
        }else if(value > value2){
            return 1
        } else if(value2 > value){
            return -1
        }else{
            return 0
        }

        })
            dispatch(filterByWeight(filterByHeight))
                props.page1();
        }
    })
}

    return(       
        <div className="classDivFilterOrigin">
            <div className="classDivFilter">
            <select className="classSelectFilt"  onChange={(e)=>filterTemp(e.target.value)}>
            <option className="classOptionFilt" disabled selected>Order By Temperament</option>
            <option className="classOptionFilt" key='All' >All</option>
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
            <select className="classSelectFilt" 
            onChange={(e)=>{e.target.value === 'All'? 
            dispatch(getBreeds())
            : dispatch(getBreeds())
            .then(data=>{
            dispatch(filterCdOrEg(e.target.value))
            })
            props.page1();
            }}>
            <option 
            className="classOptionFilt" 
            disabled selected 
            value="Order By Breed" >Order By Breed </option>
            <option 
            className="classOptionFilt" 
            value="All">All</option>
            <option 
            className="classOptionFilt" 
            value="Existing">Existing</option>
            <option 
            className="classOptionFilt" 
            value="Created" >Created</option>
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