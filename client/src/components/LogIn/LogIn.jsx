import { useState } from "react";
import { useDispatch } from "react-redux";
import { logInUser } from '../../redux/actions/index';
import validatorLogin from "./Validator.js";
import './LogIn.css';

const LogIn = () =>{

const [user, setUser] = useState({
    username:"",
    password:""
})
const [errors, setErrors] = useState({})

const dispatch = useDispatch();

const handleOnSubmit = async (event)=> {
    event.preventDefault();
    let resp = await dispatch(logInUser(user));
    if(Object.keys(resp).filter(el => el === "response").length > 0){
        alert(resp.response.data.data)
    }else{
        setUser({
            username:"",
            password:""
        });
        alert("login successful")
    }
}
const handleInputChange = (event)=> {
setUser({
    ...user,
    [event.target.name] : event.target.value,
})
setErrors(validatorLogin({
    ...user,
    [event.target.name] : event.target.value,
}))
}


return(
    <div>
        <form onSubmit={(event)=> handleOnSubmit(event)}>
        <div>
            <label className='classLabelFormLogIn' >Username</label>
            <br/>
            { Object.keys(errors).filter(elem=> elem === "username").length > 0?
                <div> 
                <span className='classSpanRedLogIn' >{errors.username}</span>
                </div>
                :null
            }
            <input 
            className={Object.keys(errors).filter(elem=> elem === "username").length > 0? 'classUserWar' : 'classLogIn'} 
            name='username'
            placeholder="..."
            type='text'
            value={user.username}
            onChange={(event) => handleInputChange(event)}
            required
            >
            </input>
        </div>
        <div>
        <label className='classLabelFormLogIn' >Password</label>
            <br/>
            { Object.keys(errors).filter(elem=> elem === "password").length > 0?
                <div> 
                <span className='classSpanRedLogIn' >{errors.password}</span>
                </div>
                :null
            }
            <input 
            className={Object.keys(errors).filter(elem=> elem === "password").length > 0? 'classUserWar' : 'classLogIn'} 
            name='password'
            placeholder="..."
            type='password'
            value={user.password}
            onChange={(event) => handleInputChange(event)}
            required
            >
            </input>
        </div>
        <div className="classBtnLogIn">
        <button className="classBtnSubmit" type="submit" value="Submit" > Login </button>
        </div>
        </form>

    </div>
    )
}

export default LogIn;