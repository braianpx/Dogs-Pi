import React from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css'
class Introduction extends React.Component{

 
    render(){
        return(
            <div id="idDiv1">
                <div id="idDivCont">  
                <h1 className="titleInt"> Welcome!</h1>
                    <div id="idDivContLink">
               <div>
                   <Link to='/home' className='buttonsIntro'> Home </Link>        
               </div>
               <div >
                   <Link to='/breed_of_day' className='buttonsIntro' > Random Breed </Link>
                   </div>
               </div>
            </div>         
        </div>
        )
    }
}

export default (Introduction);