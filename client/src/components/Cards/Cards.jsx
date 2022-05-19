import { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeds } from '../../redux/actions/index';
import Card from '../Card/Card.jsx';
import { Link } from 'react-router-dom';
import './Cards.css';

export class Cards extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum: 1,
            page: 0,
            pagePrevious: 0,
            pageNext:8,
        }
    }
    componentDidMount(){
        this.props.getBreeds()
    }
    
    nextPage(){
    if(this.state.pageNum < Math.round(this.props.breeds.length/8)){
        this.setState({
            pageNum: this.state.pageNum + 1,
            pagePrevious: this.state.page,
            page: this.state.page + 8,
            pageNext: this.state.pageNext + 8,    
        })
    }};
    
    previousPage(){
    if(this.state.page !== 0){
        this.setState({
            pageNum: this.state.pageNum - 1,
            pagePrevious: this.state.pagePrevious - 8,
            page: this.state.page - 8,
            pageNext: this.state.pageNext - 8,
        })
    }};

render(){
    return (
        <div>
            <div className='classDivCardCards'>
                { 
                    this.props.breeds.length === 0 ? 
                    <div id='idDivH1Load'>
                    <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0712.gif" alt='git_dog' id="idImgCards" />
                    <h1 id='idH1Cards'>Loading...</h1>
                    </div>                  
                :                                
                this.props.breeds.slice(this.state.page,this.state.pageNext).map( elem =>{
                    return ( 
                    <div className='classCardCards' key={elem.id}>
                        <Link to={`/home/breed/${elem.id}`} id="linkBreedId">
                    <Card 
                        name={elem.name} 
                        temperaments={elem.temperament}
                        img={elem.image.url}
                        height={elem.weight.metric}
                        />
                        </Link>
                    </div>

                      )
                    })
            }
            </div>
               {
                   this.props.breeds.length > 0?
                <div className='classBtnPage'>
                    <div className='classDivButton' >
                    <button className='classButton1' onClick={()=>this.previousPage()}  > Previous </button>
                    <button onClick={()=>this.previousPage()} className='classFlechaBtn1' ></button>
                    </div>
                    <h3 className='classH3' >{this.state.pageNum}</h3>
                    <h3 className='classH3' >{'of ' + Math.round(this.props.breeds.length/8)}</h3>
                    <div className='classDivButton'>
                    <button className='classButton2' onClick={()=>this.nextPage()} > Following </button>
                    <button onClick={()=>this.nextPage()} className='classFlechaBtn2' ></button>
                </div>
                </div>: null
                }
            </div>
        )
    }   
}


export function mapStateToProps(state){
    return{
        breeds: state.breeds
    }
}
export default connect(mapStateToProps,{getBreeds})(Cards);
