import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      kaupunki: "turku,fi",
      maa: "fi",
      sijainti: "",
      lampotilanyt: 0,
      korkeinlampotila: 0,
      matalinlampotila: 0,
      ilmanpaine: 0,
      saa: "",
    }
  }

  componentDidMount(){

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.kaupunki}&APPID=49c9ece9c127daaa37a7aff3e8d71f34&units=metric&lang=fi`;

    axios.get(URL).then(response => {
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
      this.setState({
        lampotilanyt: response.data.main.temp,
        korkeinlampotila: response.data.main.temp_max,
        matalinlampotila: response.data.main.temp_min,
        ilmanpaine: response.data.main.pressure,
        saa: response.data.weather[0].description,
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
      <div>
        <div><Input
        onChange={this.annaKaupunki}
        placeholder="Anna kaupunki" />
        </div>
        <h1>Sää: {this.state.saa}</h1>
        <h1>Lämpötila nyt: {this.state.lampotilanyt} C°</h1>
        <h1>Vuorokauden korkein lämpötila: {this.state.korkeinlampotila} C°</h1>
        <h1>Vuorokauden matalin lämpötila: {this.state.matalinlampotila} C°</h1>
        <h1>Ilmanpaine nyt: {this.state.ilmanpaine}hPa</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
