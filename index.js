import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import logo from './logo.png';
import { Input, Button } from '@material-ui/core';

const Kuva = (props) => {
  const kuva = `http://openweathermap.org/img/wn/${props.pic}@2x.png`;
  return(
      <img src={kuva} alt=""/>
  )
}

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
      tuulennopeus: "",
      saa: "",
      icon: "",
    };
    this.onEnter = this.onEnter.bind(this);
    this.annaKaupunki = this.annaKaupunki.bind(this);

  }

  onEnter(){

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.kaupunki}&APPID=49c9ece9c127daaa37a7aff3e8d71f34&units=metric&lang=fi`;

    axios.get(URL).then(response => {
      var obj = response.data.weather[0].icon;
      var ikoni = obj.toString();
      this.setState({
        lampotilanyt: response.data.main.temp,
        korkeinlampotila: response.data.main.temp_max,
        matalinlampotila: response.data.main.temp_min,
        ilmanpaine: response.data.main.pressure,
        kosteus: response.data.main.humidity,
        tuulennopeus: response.data.wind.speed,
        saa: response.data.weather[0].description,
        icon: ikoni,
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

    return(
        <>
        <header>
            <div>
                <img src={logo} alt="logo"/>
            </div>
        </header>
        <body>
            
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
                    <h1>Tuulen nopeus nyt: {this.state.tuulennopeus} m/s</h1>
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
