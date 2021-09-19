import React from "react";
import "./App.css";

import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Form from "./app_component/form.component";

//api call api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a0eb5f2752ee4cfc7bd323248d111acc
const API_key="a0eb5f2752ee4cfc7bd323248d111acc";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };


    this.weatherIcon={
      Storm:"wi-strom-showers",
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-rain",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Smoke:"wi-smoke",
      Clear:"wi-moon-new",
      Clouds:"wi-cloudy",
      Sand:"wi-sandstrom",
      Ash:"wi-volcano",
      Dust:"wi-dust",
      Squall:"wi-strong-wind",
      Tornado:"wi-tornado"
    }
  }
calCelsius(temp){
  let cell = Math.floor(temp-273.15);
  return cell;
}

get_WeatherIcon(icons,rangeID){
  switch(true){
    case rangeID >= 200 && rangeID <=202:
      this.setState({icon:this.weatherIcon.Storm});
      break;
    case rangeID >= 210 && rangeID <=232:
      this.setState({icon:this.weatherIcon.Thunderstorm});
      break;
    case rangeID >= 300 && rangeID <=321:
      this.setState({icon:this.weatherIcon.Drizzle});
      break;
    case rangeID >= 500 && rangeID <=531:
      this.setState({icon:this.weatherIcon.Rain});
      break;
    case rangeID >= 600 && rangeID <=622:
        this.setState({icon:this.weatherIcon.Snow});
        break;
    case rangeID === 701:
          this.setState({icon:this.weatherIcon.Atmosphere});
          break;
    case rangeID === 711:
          this.setState({icon:this.weatherIcon.Smoke});
          break;
          case rangeID === 721:
            this.setState({icon:this.weatherIcon.Atmosphere});
            break;
case rangeID === 731:
          this.setState({icon:this.weatherIcon.Sand});
          break;
          case rangeID === 741:
            this.setState({icon:this.weatherIcon.Atmosphere});
            break;
            case rangeID === 751:
          this.setState({icon:this.weatherIcon.Sand});
          break;
          case rangeID === 761:
          this.setState({icon:this.weatherIcon.Dust});
          break;
          case rangeID === 762:
            this.setState({icon:this.weatherIcon.Ash});
            break;
            case rangeID === 771:
              this.setState({icon:this.weatherIcon.Squall});
              break;
              case rangeID === 781:
          this.setState({icon:this.weatherIcon.Tornado});
          break;
      case rangeID === 800:
          this.setState({icon:this.weatherIcon.Clear});
          break;
      case rangeID >= 801 && rangeID <=804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
      default:this.setState({icon:this.weatherIcon.Clouds});
  }
}
  
  getWeather = async (e) =>{

e.preventDefault();

const city = e.target.elements.city.value;
const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
  const response = await api_call.json();

  console.log(response);

  this.setState({
    city:`${response.name} , ${response.sys.country}`,
    celsius:this.calCelsius(response.main.temp),
    temp_max:this.calCelsius(response.main.temp_max),
    temp_min:this.calCelsius(response.main.temp_min),
    description:response.weather[0].description,
  });

  this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
  };
  render(){
    return(
      <div>
          <div className="App">
            <Form loadweather={this.getWeather}/>
            <Weather city={this.state.city}
             country={this.state.country}
             temp_celsius={this.state.celsius}
             temp_min={this.state.temp_min}
             temp_max={this.state.temp_max}
             description={this.state.description}
             weatherIcon={this.state.icon}
            />
          </div>
      </div>
    );
  }
}


export default App;
