import { Component } from "react";
import { connect } from 'react-redux';
import { createUser } from '../../redux/actions/index.js'; 
import validatorRegister from './Validator.js';
import './SignUp.css';

class SignUp extends Component {
constructor(props){
    super(props)
    this.state = {
        username:"",
        password:"",
        repeatPassword:"",
        errors:{}        
    }
}

async handleOnSubmit(event){
    event.preventDefault();
    let resp = await this.props.createUser(this.state);
    if(Object.keys(resp).filter(el => el === "response").length > 0){
        alert(resp.response.data.data)
    }else{
        this.setState({
            username:"",
            password:"",
            repeatPassword:"",
            errors:{}
        });
        alert(resp.data.data)
    }
}

handleInputChange(event){
    this.setState({
        ...this.state,
    [event.target.name] : event.target.value
    });
    this.setState(validatorRegister({
        ...this.state,
    [event.target.name] : event.target.value
    }));
}
    render(){
        return(
        <div>
            <form onSubmit={(event) => this.handleOnSubmit(event)} >
                <div>
                    <label className="classLabelFormSigIn" >Username</label>
                    <br/>
                    { Object.keys(this.state.errors).filter(elem=> elem === "username").length > 0?
                    <div > 
                    <span className='classSpanRedSigIn' >{this.state.errors.username}</span>
                    </div>
                    :null
                    }
                    <input
                    className={Object.keys(this.state.errors).filter(elem=> elem === "username").length > 0? 'classUserWar' : 'classSigIn'} 
                    name="username"
                    placeholder="..."
                    type='text'
                    value={this.state.username}
                    onChange={(event) => this.handleInputChange(event)}
                    required
                    ></input>   
                </div>
                <div>
                    <label className="classLabelFormSigIn" >Password</label>
                    <br/>
                    { Object.keys(this.state.errors).filter(elem=> elem === "password").length > 0?
                    <div > 
                    <span className='classSpanRedSigIn' >{this.state.errors.password}</span>
                    </div>
                    :null
                    }
                    <input
                    className={Object.keys(this.state.errors).filter(elem=> elem === "password").length > 0? 'classUserWar' : 'classSigIn'}
                    name="password"
                    placeholder="..."
                    type='password'
                    value={this.state.password}
                    onChange={(event) => this.handleInputChange(event)}
                    required
                    ></input>
                </div>
                <div>
                    <label className="classLabelFormSigIn" >Repeat Password</label>
                    <br/>
                    { Object.keys(this.state.errors).filter(elem=> elem === "repeatPassword").length > 0?
                    <div> 
                    <span className='classSpanRedSigIn' >{this.state.errors.repeatPassword}</span>
                    </div>
                    :null
                    }
                    <input
                    className={Object.keys(this.state.errors).filter(elem=> elem === "repeatPassword").length > 0? 'classUserWar' : 'classSigIn'}
                    name="repeatPassword"
                    placeholder="..."
                    type="password"
                    value={this.state.repeatPassword}
                    onChange={(event) => this.handleInputChange(event)}
                    required
                    ></input>
                </div>
                <div className="classBtnSigIn">
                    <button className="classBtnSubmitSigIn" type="submit" value="Submit" > SignUp </button>
                </div>
            </form>
        </div>
        )
    }
}

export default connect(null,{ createUser })(SignUp);
