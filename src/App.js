import React, { Component } from 'react';
import './App.css';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = '00b4c85b6fcd62d63be6796e2ad78409';

class App extends Component {
	// state is an object that is reponsible for keeping track of changing data
	//this will be the initial/default state of the object
	//state will only change after we click the button
	state = {
		temperature:  undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		icon: undefined,
		error: undefined 
	}

	getWeather = async (e) => {
		
		e.preventDefault();
		//use 'e' to access the name in the form
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=Imperial`);
		
		// convert the reponse to JSON format 
		const data = await api_call.json(); 
		if (data.cod === '404') {
			this.setState({
			  	error: 'City Not Found'
			});
		} else if(city && country){
			console.log(data);
			this.setState({
				temperature: Math.floor(data.main.temp),
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				icon: data.weather[0].icon,
				error: ""
			});
		} else {
			this.setState({
				temperature:  undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				icon: "",
				error: "Please enter a value "
			});
		}
	}
	render() {
		return (
			<div>
				<div className="wrapper">
					<div className="main">
						<div className="container-fluid">
							<div className="row">
								<div className="col-xs-5 title-container">
									<Titles />
								</div>
								<div className="col-xs-7 form-container">
									<Form getWeather = { this.getWeather }/>
									<Weather 
										temperature = { this.state.temperature }
										city = { this.state.city }
										country = { this.state.country }
										humidity = { this.state.humidity }
										description = { this.state.description }
										icon = {this.state.icon }
										error = { this.state.error }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

				

export default App;

	// react 15 and under required constructors
	// contructor() {
	// 	super();
	    // then bind the method
	// 	this.getWeather = this.getWeather.bind(this);
	// }

	// new react 16 arrow func allows you to use the 'this' keyword independently
	// now 'this' keyword is bound to the getWeather func
	// template strings allow you to inject data into the files: ${API_KEY}