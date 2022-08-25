import { Component } from "react";
import { Link } from 'react-router-dom';
import './NotFound.css';


class NotFound extends Component {

    render(){
    return(
        <div className="classDivNotFound">
            <h1 className="classh1NotFount">Not Found 404</h1>
            <Link to='/home' className="classLinkHome" >Home</Link>
        </div>
    )
}
}

export default (NotFound);