import { Component } from 'react';
import Card from '../Card/Card.jsx';
import { Link } from 'react-router-dom';
import './Cards.css';

class Cards extends Component {
     
render(){
    return (
        <div id="idDivCardsOrigin">
            <div className='classDivCardCards'>
                { 
                    this.props.breeds.length === 0 ? 
                    <div id='idDivH1Load'>
                    <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0712.gif" alt='git_dog' id="idImgCards" />
                    <h1 id='idH1Cards'>Loading...</h1>
                    </div>                  
                :                                
                this.props.breeds.map( elem =>{
                    return ( 
                    <div className='classCardCards' key={elem.id}>
                        <Link to={`/home/breed/${elem.id}`} id="linkBreedId">
                    <Card 
                        name={elem.name}
                        temperaments={elem.temperaments?String(elem.temperaments.map(elem=>{return elem.name})):elem.temperament}
                        img={elem.image?elem.image.url?elem.image.url:null:null }
                        height={elem.weight.metric?elem.weight.metric:"unknown"}
                        />
                        </Link>
                    </div>

                      )
                    })
            }
            </div>
               
            </div>
        )
    }   
}


export default (Cards);
