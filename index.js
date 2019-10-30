import React from 'react';
import ReactDOM from 'react-dom';
import index from './index.css';
import axios from 'axios';
import logo from './xd.jpg';

import { Input, Button } from '@material-ui/core';

import oned from './icons/01d.png'
import twod from './icons/02d.png'
import threed from './icons/03d.png'
import fourd from './icons/04d.png'
import nined from './icons/09d.png'
import tend from './icons/10d.png'
import elevend from './icons/11d.png'
import thirteend from './icons/13d.png'
import fiftyd from './icons/50d.png'
import onen from './icons/01n.png'
import twon from './icons/02n.png'
import threen from './icons/03n.png'
import fourn from './icons/04n.png'
import ninen from './icons/09n.png'
import tenn from './icons/10n.png'
import elevenn from './icons/11n.png'
import thirteenn from './icons/13n.png'
import fiftyn from './icons/50n.png'

//const Kuva = (props) => {
    //const kuva = `./icons/${props.props}.png`;
    //console.log(kuva);
    //return(
        //<img src={kuva}/>
    //)
//}

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      kaupunki: "",
      lampotilanyt: "",
      korkeinlampotila: "",
      matalinlampotila: "",
      ilmanpaine: "",
      kosteus: "",
      saa: "",
      icon: "",
    };
    this.onEnter = this.onEnter.bind(this);
    this.annaKaupunki = this.annaKaupunki.bind(this);

  }

  onEnter(){

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.kaupunki}&APPID=49c9ece9c127daaa37a7aff3e8d71f34&units=metric&lang=fi`;

    axios.get(URL).then(response => {
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
      console.log(response.data.weather[0].icon)
      this.setState({
        lampotilanyt: response.data.main.temp,
        korkeinlampotila: response.data.main.temp_max,
        matalinlampotila: response.data.main.temp_min,
        ilmanpaine: response.data.main.pressure,
        kosteus: response.data.main.humidity,
        saa: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      })
    })    
  }

  

  annaKaupunki(e){
    const value = e.currentTarget.value;
    this.setState({
      kaupunki: value,
    })
  }

  render(){

    const Kuva = (props) => {
        const kuva = `./icons/${props.pic}.png`;
        console.log(kuva);
        console.log(props.pic);
        return(
            <img src={kuva}/>
        )
    }

    return(
        <>
        <header>
            <div>
                <img src={logo}/>
            </div>
        </header>
        <body>
            <div>
                <div>
                    <Input
                    onChange={this.annaKaupunki}
                    placeholder="Anna kaupunki"
                    fontSize="30" />
                
                    <Button onClick={this.onEnter}>→</Button>
                </div>
                <div>
                    <h1>Sää: {this.state.saa}</h1>
                    <h1>Lämpötila nyt: {this.state.lampotilanyt} C°</h1>
                    <h1>Ilmankosteus nyt: {this.state.kosteus} %</h1>
                    <h1>Ilmanpaine nyt: {this.state.ilmanpaine}hPa</h1>
                </div>
                <div>
                    
                </div>
            </div>
            <div>
                <Kuva pic={this.state.icon}/>
            </div>
        </body>
        </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
