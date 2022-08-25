import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteUser, logOut } from '../../redux/actions/index.js';
import NavBar from "../NavBar/NavBar";
import './User.css';

class Perfil extends Component {
    constructor(){
        super()
        this.state = {
            switchButtons : false,
            switchButtonsOut : false
        } 
    }

visibilityButtons(){
    if(!this.state.switchButtons)
    this.setState({
        ...this.state,
        switchButtons: true
     })   
    else 
    this.setState({
       ...this.state,
       switchButtons: false
    })
}

visibilityButtonsOut(){
    if(!this.state.switchButtonsOut)
    this.setState({
        ...this.state,
        switchButtonsOut: true
     })   
    else 
    this.setState({
        ...this.state,
        switchButtonsOut: false
     })
}

/////

visibilityBtnHidden(){
    this.setState({
        ...this.state,
        switchButtons: false
     })
}
visibilityBtnHiddenOut(){
    this.setState({
        ...this.state,
        switchButtonsOut: false
     })
}

    render(){
        if(!this.props.user.username){
            return <Navigate to="/home" />
        }
        return(
            <div className="classDivContentuser">
               <NavBar />
                    <div className="classDivUser" >
                        <h2 className="classNameUser">{this.props.user.username}</h2>
                        <button className='classBtnUser' onClick={() => this.visibilityButtonsOut() }> LogOut </button>
                        <div className={this.state.switchButtonsOut? null :'classDivFalse'}>
                                <button className='classDivButtonsTrue' onClick={ () => this.props.logOut()} > yes </button>
                                <button className='classDivButtonsTrue' onClick={ () => this.visibilityBtnHiddenOut()}> no </button>
                           </div>
                        <button className='classBtnUser' onClick={() => this.visibilityButtons()}>Delete Account</button>    
                           <div className={this.state.switchButtons? null :'classDivFalse'}>
                                <button className='classDivButtonsTrue' onClick={ () => this.props.deleteUser()} > yes </button>
                                <button className='classDivButtonsTrue' onClick={ () => this.visibilityBtnHidden()}> no </button>
                           </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  };

export default connect(mapStateToProps,{deleteUser,logOut})(Perfil)