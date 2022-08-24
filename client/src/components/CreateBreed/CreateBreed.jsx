import { useDispatch, useSelector } from 'react-redux';
import { postBreed, getTemperaments } from '../../redux/actions/index';
import validator from './Validator.js';
import './CreateBreed.css';
import { useState , useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';

const CreateBreeed  = () =>{

const dispatch = useDispatch();
const temperaments = useSelector(state => state.temperaments);
const [state, setState] = useState({
        name:"",
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        life_span:"",
        url:"",
        temperament:[],
        switchBt:false,
        redirect:false
    });
const [errors, setErrors] = useState({})

useEffect(()=>{
    dispatch(getTemperaments());
},[dispatch])

const handleOnSubmit = async (e) => { 
        e.preventDefault();
        try{
        if(state.switchBt){
            let resp = await postBreed(state)
            if(Object.keys(resp).filter(el => el === "response").length > 0){
                alert(resp.response.data.data)
                setErrors({
                    ...errors,
                    name : `${resp.response.data.data}`
                })
            }else{
            setState({
                name:"",
                heightMin:"",
                heightMax:"",
                weightMin:"",
                weightMax:"",
                life_span:"",
                url:"",
                temperament:[],
                switchBt: false,
                redirect: resp.data.idBreed
            });
            alert(resp.data.data);
         }
        }else{
            setErrors(validator({
                ...state
            }));
        }
    }catch(err){}}      
const handleInputChange = (e) => {
    setState({
        ...state,
            [e.target.name] : e.target.value,
            switchBt : true
    })
    setErrors(validator({
        ...state,
        [e.target.name] : e.target.value
           }))

}
const handleTempChange = (event) => {
    const temper = event.target.value; 
    const swit = state.temperament.filter(elem => elem === temper);
if(swit.length === 0){
    setState({
        ...state,
        temperament: state.temperament.concat(temper)
    })
    setErrors(validator({
        ...state,
        temperament: state.temperament.concat(temper)
    }))
}};

const deleteTemperament = (event) => {
const filterTemp = state.temperament.filter(el=> el !== event.target.value)
    setState({
        ...state,
        temperament: filterTemp
    })
    setErrors(validator({
        ...state,
        temperament: filterTemp
    }))
}

if(state.redirect){
    return <Redirect to={`/home/breed/${state.redirect}`} />
}else{
    return(
        <div className='classDivForm'>
        <h2 id="idH2Form">Create Breed</h2>
        <form onSubmit={(e)=> handleOnSubmit(e) }>
            <div>
            <label className='classLabelForm' >Name</label>
                <br/>
                { Object.keys(errors).filter(elem=> elem === "name").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning' >{errors.name}</span></div>:null
                }
                <input className={Object.keys(errors).filter(elem=> elem === "name").length > 0? 'classwarning' : 'classForm'} 
                placeholder="America Bulldog" 
                onChange={(e)=> handleInputChange(e)} 
                name="name" 
                type='text' 
                value={state.name}>
                </input>
            </div>
            <div>        
            <label className='classLabelForm'>Height Min (cm)</label>
                <br/>
                { Object.keys(errors).filter(elem=> elem === "heightMin").length > 0?
                  <div className='classDivSpan'>  <span className='classSpanWarning' >{errors.heightMin}</span></div>:null 
                }
                <input className={Object.keys(errors).filter(elem=> elem === "heightMin").length > 0? 'classwarning': 'classForm'} 
                placeholder="80" 
                name="heightMin" 
                type="text" 
                value={state.heightMin} 
                onChange={(e)=> handleInputChange(e)} ></input>   
            </div>

            <div>                  
            <label className='classLabelForm'>Height Max (cm)</label>
            <br/>
            { Object.keys(errors).filter(elem=> elem === "heightMax").length > 0?
                  <div className='classDivSpan'>  <span className='classSpanWarning' >{errors.heightMax}</span></div>:null 
                }
                <input  className={Object.keys(errors).filter(elem=> elem === "heightMax").length > 0? 'classwarning': 'classForm'} 
                placeholder="120" 
                name="heightMax" 
                type="text" 
                value={state.heightMax} 
                onChange={(e)=> handleInputChange(e)} ></input>
            </div>        

            <div>         
            <label className='classLabelForm'>Weight Min (kg)</label>
            <br/>
            { Object.keys(errors).filter(elem=> elem === "weightMin").length > 0?
                  <div className='classDivSpan'>  <span className='classSpanWarning'>{errors.weightMin}</span></div>:null 
                }
                <input className={Object.keys(errors).filter(elem=> elem === "weightMin").length > 0? 'classwarning': 'classForm'} 
                placeholder="5" 
                name="weightMin"  
                type="text" 
                value={state.weightMin}
                onChange={(e)=> handleInputChange(e)}></input>
            </div>        

            <div>                
            <label className='classLabelForm'>Weight Max (kg)</label>
            <br/>
            { Object.keys(errors).filter(elem=> elem === "weightMax").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning'>{errors.weightMax}</span></div>:null
                }
                <input className={Object.keys(errors).filter(elem=> elem === "weightMax").length > 0? 'classwarning': 'classForm'} 
                placeholder="20" 
                name="weightMax" 
                type="text" 
                value={state.weightMax}
                onChange={(e)=> handleInputChange(e)}></input>
            </div>        

            <div>
            <label className='classLabelForm'>Life Span (years)</label>
            <br/>
            { Object.keys(errors).filter(elem=> elem === "life_span").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning'>{errors.life_span}</span></div>:null
                }
                  <input className={Object.keys(errors).filter(elem=> elem === "life_span").length > 0? 'classwarning': 'classForm'} 
                  placeholder='12' 
                  name="life_span"  
                  type="text" 
                  value={state.life_span}
                  onChange={(e)=> handleInputChange(e)}></input>
            </div>

            <div>
            <label className='classLabelForm'>Image Url: </label>  
            <br/>
            { Object.keys(errors).filter(elem=> elem === "url").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning' >{errors.url}</span></div>:null
                }
                 <input className={Object.keys(errors).filter(elem=> elem === "url").length > 0? 'classwarning': 'classForm'} 
                 placeholder='https://imagedog/pitbull.jpg' 
                 name="url" 
                 type="url"
                 value={state.url} 
                 onChange={(e)=> handleInputChange(e)}></input>
            
            </div>

            <div>
            <label className='classLabelForm'>Temperaments</label>
            <br/>
            { errors.temperament? 
            <div className='classDivSpan'><span className='classSpanWarning' >{errors.temperament}</span></div>:null
            }
            <select className='classForm' value="Select Temperaments" onChange={(e)=> handleTempChange(e)}>
            <option disabled > Select Temperaments</option>
            { temperaments.map(elem=>{
              return (           
              <option  key={elem.id} value={elem.name} >{elem.name}</option> 
              ) 
            })
            }
            </select>
            <br/>
            <div id="idDivContentTpSc">
            {state.temperament.map(elem=>{
                return ( 
                        <div key={elem} className="classDivTempCreated">
                            <button value={elem} onClick={(event)=>deleteTemperament(event)} className='classBtnCreated'>x</button>
                        <span className='classSpanCreate'>{elem}</span>
                        </div>
                      )
                })}
            </div>
            </div>

            <div id='idDivBtnForm'>
                <div className='classPaddingBtn'>
                    <Link to="/home" > 
                        <button className='classBtnForm' id='idLinkForm' > Back Home </button>
                    </Link>
                </div>  
                    <div className='classPaddingBtn'>
                        <button className={Object.keys(errors).length >= 1 || !state.switchBt ? "classBtnWarning": "classBtnForm"}  type='submit' value='Submit' > Create Breed</button>
                    </div>
            </div>
        </form>
        </div>
    )
            }
        }
export default CreateBreeed;