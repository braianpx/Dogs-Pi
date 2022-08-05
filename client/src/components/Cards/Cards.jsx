import { Component } from 'react';
import Card from '../Card/Card.jsx';
import './Cards.css';
import ImgNotFound from '../../img/istockphoto-1225830150-612x612.jpg';


class Cards extends Component {
constructor(props){
    super(props)
this.state = {
    landingPage : 0
}}

loadingDate(){
setTimeout(()=>{
    if(this.state.landingPage < 5 ){
    this.setState({
        ...this.state,
        landingPage : this.state.landingPage + 1})
    }else if(!this.state.landingPage){
        this.setState({
            ...this.state,
            landingPage : 0}) 
    }
},1400)

}

render(){
    return (
        <div id="idDivCardsOrigin">
            <div className='classDivCardCards'>
                { 
                    this.state.landingPage < 5? 
                    <div id='idDivH1Load'>
                        {this.loadingDate()}
                    <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0712.gif" alt='git_dog' id="idImgCards" />
                    <h1 id='idH1Cards'>Loading...</h1>
                    </div>              
                : this.props.breeds === false ?
                <div id='div_id_not_found'>
                    <h1 id='id_not_found' >NOT FOUND</h1>
                    <img src={ImgNotFound}  id="id_not_found_img" alt='Img_not_found'/>
                </div>
                :
                this.props.breeds.length === 0?
                <div id='div_id_not_found'>
                    <h1 id='id_not_found' >NOT FOUND</h1>
                    <img src={ImgNotFound}  id="id_not_found_img" alt='Img_not_found'/>
                </div>
                :
                this.props.breeds.map( elem =>{
                    return ( 
                    <div className='classCardCards' key={elem.id}>
                    <Card
                        username={this.props.username || false}
                        favoriteId={this.props.breedsFavorites[0] || false}
                        breedsFavorites={this.props.breedsFavorites[1] || false}
                        id={elem.id}
                        name={elem.name}
                        temperaments={elem.temperaments?String(elem.temperaments.map(elem=>{return elem.name})):elem.temperament}
                        img={elem.image?elem.image.url?elem.image.url:null:null }
                        height={elem.weight.metric?elem.weight.metric:"unknown"}
                        />
                    </div>

                      )
                    })
                    
            }
            </div>
               
            </div>
        )
    }   
}



export default(Cards);
