import { Component } from 'react';
import { connect } from 'react-redux';
import { postBreed, getTemperaments } from '../../redux/actions/index'
import validator from './Validator.js'
import './CreateBreed.css'
import { Link } from 'react-router-dom'
class CreateBreeed extends Component{
constructor(props){
    super(props)
    this.state = {
        name:"",
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        life_span:"",
        url:"",
        temperament:[],
        errors:{},
        createBreed:{}
    }
}

componentDidMount(){
    this.props.getTemperaments()
}
handleOnSubmit(e){ 
    e.preventDefault();
    postBreed(this.state)
    .then(resp =>{
        if(Object.keys(resp).filter(el => el === "response").length > 0){
            this.setState({
                ...this.state,
                errors:{name:"name is required",heightMax:"height max is required",
                heightMin:"height min is required",weightMax:"weight max is required",
                weightMin:"weight min is required",life_span:"life span is required",
                temperament:"temperament is required"
            }
            });    
        }else if(Object.keys(this.state.errors).length === 0){
            this.setState({
                name:"",
                heightMin:"",
                heightMax:"",
                weightMin:"",
                weightMax:"",
                life_span:"",
                url:"",
                temperament:[],
                errors:{},
                createBreed:{},
            });
            alert(resp.data.data);
        }
    }) 
}
handleInputChange(e){
    this.setState({
        ...this.state,
            [e.target.name] : e.target.value
    })
    this.setState(validator({
        ...this.state,
        [e.target.name] : e.target.value
           }))
        
}
handldeTempChange(event){
    const temper = event.target.value; 
    const swit = this.state.temperament.filter(elem => elem === temper);
if(swit.length === 0){
    this.setState({
        ...this.state,
        temperament: this.state.temperament.concat(temper)
    })
}};
render(){
    return(
        <div className='classDivForm'>
        
        <h2 id="idH2Form">Create Breed</h2>
        <form onSubmit={(e)=> this.handleOnSubmit(e) }>
            <div>
            <label className='classLabelForm' >Name</label>
                <br/>
                { Object.keys(this.state.errors).filter(elem=> elem === "name").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning' >{this.state.errors.name}</span></div>:null
                }
                <input className={Object.keys(this.state.errors).filter(elem=> elem === "name").length > 0? 'classwarning' : 'classForm'} placeholder="America Bulldog" onChange={(e)=> this.handleInputChange(e)} name="name" type='text' value={this.state.name}></input>
            </div>

            <div>        
            <label className='classLabelForm'>Height Min (cm)</label>
                <br/>
                { Object.keys(this.state.errors).filter(elem=> elem === "heightMin").length > 0?
                  <div className='classDivSpan'>  <span className='classSpanWarning' >{this.state.errors.heightMin}</span></div>:null 
                }
                <input className={Object.keys(this.state.errors).filter(elem=> elem === "heightMin").length > 0? 'classwarning': 'classForm'} placeholder="80" name="heightMin" type="text" value={this.state.heightMin} onChange={(e)=> this.handleInputChange(e)} ></input>   
            </div>

            <div>                  
            <label className='classLabelForm'>Height Max (cm)</label>
            <br/>
            { Object.keys(this.state.errors).filter(elem=> elem === "heightMax").length > 0?
                  <div className='classDivSpan'>  <span className='classSpanWarning' >{this.state.errors.heightMax}</span></div>:null 
                }
                <input  className={Object.keys(this.state.errors).filter(elem=> elem === "heightMax").length > 0? 'classwarning': 'classForm'} placeholder="120" name="heightMax" type="text" value={this.state.heightMax} onChange={(e)=> this.handleInputChange(e)} ></input>
            </div>        

            <div>         
            <label className='classLabelForm'>Weight Min (kg)</label>
            <br/>
            { Object.keys(this.state.errors).filter(elem=> elem === "weightMin").length > 0?
                  <div className='classDivSpan'>  <span className='classSpanWarning'>{this.state.errors.weightMin}</span></div>:null 
                }
                <input className={Object.keys(this.state.errors).filter(elem=> elem === "weightMin").length > 0? 'classwarning': 'classForm'} placeholder="5" name="weightMin"  type="text" onChange={(e)=> this.handleInputChange(e)}></input>
            </div>        

            <div>                
            <label className='classLabelForm'>Weight Max (kg)</label>
            <br/>
            { Object.keys(this.state.errors).filter(elem=> elem === "weightMax").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning'>{this.state.errors.weightMax}</span></div>:null
                }
                <input className={Object.keys(this.state.errors).filter(elem=> elem === "weightMax").length > 0? 'classwarning': 'classForm'} placeholder="20" name="weightMax" type="text" onChange={(e)=> this.handleInputChange(e)}></input>
            </div>        

            <div>
            <label className='classLabelForm'>Life Span (years)</label>
            <br/>
            { Object.keys(this.state.errors).filter(elem=> elem === "life_span").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning'>{this.state.errors.life_span}</span></div>:null
                }
                  <input className={Object.keys(this.state.errors).filter(elem=> elem === "life_span").length > 0? 'classwarning': 'classForm'} placeholder='12' name="life_span"  type="number" onChange={(e)=> this.handleInputChange(e)}></input>
            </div>

            <div>
            <label className='classLabelForm'>Image Url: </label>  
            <br/>
            { Object.keys(this.state.errors).filter(elem=> elem === "url").length > 0?
                    <div className='classDivSpan'><span className='classSpanWarning' >{this.state.errors.url}</span></div>:null
                }
                 <input className={Object.keys(this.state.errors).filter(elem=> elem === "url").length > 0? 'classwarning': 'classForm'} placeholder='https://imagedog/pitbull.jpg' name="url" type="url" onChange={(e)=> this.handleInputChange(e)}></input>
            
            </div>

            <div>
            <label className='classLabelForm'>Temperaments</label>
            <br/>
            <div><span id="idSpann">You must select a temperament or else the other fields will have errors</span></div>
            { this.state.errors.temperament? 
            <div className='classDivSpan'><span className='classSpanWarning' >{this.state.errors.temperament}</span></div>:null
            }
            <select className='classForm' value="Select Temperaments" onChange={(e)=> this.handldeTempChange(e)}>
            <option disabled > Select Temperaments</option>
            { this.props.temperaments.map(elem=>{
              return (           
              <option  key={elem.id} value={elem.name} >{elem.name}</option> 
              ) 
            })
            }
            </select>
            {this.state.temperament.map(elem=>{
                return ( 
                        <div key={elem}>
                        <span className='classSpanCreate'>{elem}</span>
                        </div>
                      )
                })}

            </div>

            <div id='idDivBtnForm'>
                <div className='classPaddingBtn'>
                    <Link to="/home" > 
                        <button className='classBtnForm' id='idLinkForm' > Back Home </button>
                    </Link>
                </div>  
                    <div className='classPaddingBtn'>
                        <button className={Object.keys(this.state.errors).length >= 1? "classBtnWarning": "classBtnForm"}  type='submit' value='Submit' > Create Breed</button>
                    </div>
            </div>
        </form>
        </div>
    )
}
}

export function mapStateToProps(state){
    return{
        temperaments: state.temperaments
    }
}

export default connect (mapStateToProps,{ postBreed, getTemperaments })(CreateBreeed)