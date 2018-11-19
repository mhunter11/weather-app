import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: {},
      inputValue: '',
      isLoading: true
    }
  }
  onSubmit(e) {
    e.preventDefault();
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=b3456f9acbfa64fc4495e6696ecdc9a5`)
      .then((response) => {
        console.log(response)
        this.setState({
          data: response.data,
          isLoading: false
        })
      })
      .catch((error) => {
        // Error
        console.log(error)
       });
  } 
  renderWeather() {
    let { wind, main, weather, name  } = this.state.data;
    let fahrenheit = Math.round(((main.temp - 273.15)*1.8)+32); //convert kelvin into fahrenheit then round it to a nice whole number
    let description = weather[0].description;
    let icon = weather[0].icon;
    icon = `http://openweathermap.org/img/w/${icon}.png`;
    return (
      <div className="wrapper">
        <h1 className="location">{name}</h1>
        <h2 className="date">{moment().format('MMMM, Do YYYY')}</h2>
        <div className="container">
          <img src={icon} alt="open weather icon" />
          <div className="conditions">{description}</div>
        </div>
        <p className="temp">{fahrenheit}&#176;F</p>
        <div>wind speed of {wind.speed} m/s</div>
        <div>humidity of {main.humidity}%</div>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit.bind(this)}>
          <Input
            placeholder="Brooklyn"
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value})}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        </form>
        {this.state.isLoading ? <div></div> : this.renderWeather()}
      </div>
    );
  }
}

export default App;

/*todo 
You should render the weather icon that comes back with
the response, the description of the weather, the temperature in Fahrenheit, wind speed and humidity.
*/

