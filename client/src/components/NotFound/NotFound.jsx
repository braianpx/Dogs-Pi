import { Component } from "react";
import { Link } from 'react-router-dom';
class NotFound extends Component {
constructor(){
    super()
}

    render(){
    return(
        <div>
            <h1>Not Found 404</h1>
            <Link to='/home' >Home</Link>
        </div>
    )
}
}

export default (NotFound);