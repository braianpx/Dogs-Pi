import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import LogIn from "../LogIn/LogIn.jsx";
import SignUp from "../SignUp/SignUp.jsx";
import './LoginAndSignUp.css';

const LoginAndSigIn = () => {

const [switchLog, setSwitchLog] = useState(false)

const user = useSelector(state => state.user)


const switchLogIn = () =>{
    setSwitchLog(true)
}
const switchRegister = () =>{
    setSwitchLog(false)
}

if(user.username){ 
        return <Navigate to='/home' />   
}
    return(
    <>
    <NavBar />
        <div className="classDivOne">
        <div className="classDivSwitch">
                <button onClick={()=> switchLogIn()} className={ switchLog? 'classSwitTrue':'classSwitchFalse'} > LogIn </button>
                <button onClick={()=> switchRegister()} className={ !switchLog? 'classSwitTrue':'classSwitchFalse'} > SignUp </button>
                </div>
            <div className="classDivContent">
            { switchLog?
            <LogIn />:
            <SignUp />
                }
            </div>
        </div>
        </>
    )
}

export default LoginAndSigIn;