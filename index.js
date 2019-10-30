import  React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            saeae: null,
        };
    }

    async componentDidMount() {
        //const URL = `api.openweathermap.org/data/2.5/weather?q=Turku&APPID=49c9ece9c127daaa37a7aff3e8d71f34&units=metric`;
        const URL = 'http://dataservice.accuweather.com/currentconditions/v1/134768?apikey=X5uGAfUIAMtcjZ1rW385qKRupJqKooXA%20'; 
        const response = await fetch(URL);
        const data = await response.json();
        const myData = JSON.stringify(data);
        this.setState({
            saeae: myData.results
        });
    }

    onPress(){
        console.log(this.state.saeae);
    }

    render() {
        return(
            <div>
                <button onClick={this.onPress}>xd</button>
                <div>
                    {this.state.saeae}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);



//Error: Objects are not valid as a React child (found: object with keys {coord, weather, base, main, visibility, wind, snow, clouds, dt, sys, timezone, id, name, cod}). If you meant to render a collection of children, use an array instead.
//in div (at src/index.js:27)
//in div (at src/index.js:26)
//in App (at src/index.js:36)