import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import React , {useState} from "react"
import './App.css';

function App() {
  const [date , setDate] = useState({});
  const [location , setLocation] = useState('');
  const [inputValue , setinputValue] = useState(''); 
  //API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=564687bbb0bafad3d2ae4ea1e1bb497d`;

  //Show Error 
  const mySwal = withReactContent(Swal);
  const showError = ( heaadLine , message , icon) => {
    mySwal.fire({
      title : <strong>{heaadLine}</strong> ,
      text: message ,
      icon : icon ,
      confirmButtonText : "Okay" , 
    })
  }


  //* To get the value of input 
const getInputVaule = (event) => {
  setinputValue(event.target.value);
};

// Send request 
const getWeatherDate = async () => {
  //! Check if the input is empty 
  if(inputValue !== ''){
    // Send the request 
    try{
      // set The location 
      setLocation(inputValue);
      // Send The request
      const response = await axios.get(url); 
      setDate(response.data); // Set The date 
      setLocation(inputValue); // Set the value of location 
      setinputValue(''); // Romove the input value 
      console.log(response.data);
      console.log(url);
    }
    catch(e){ 
      setDate({}); // Delete Date to avoid Error
      setLocation(''); // Romove Value of Location 
      setinputValue(''); // Romove value of input 
      showError( "Location Not Found ","Sorry, we could not find the weather for this city. Please check the city name and try again." , "info"); //! Show Error
      console.log(url);
    }
  } else {
    showError("Input Needed!"  , "Please enter a city name before you search.." , "warning"); //! If user didn't write anything in input
  }
}





  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Enter the city"  value={inputValue} onChange={getInputVaule}/>
        <button className="searchButton" onClick={getWeatherDate}>Search</button>
      </div>
      <div className='Container'>
        <div className='top'>
          <div className='location'>
            <p>{date.main ? `${date.name},${date.sys.country}` : ""}</p>
          </div>
          <div className='temp'>
          <h1>{date.main ? `${(date.main.temp).toFixed()}°C` : ""}</h1>
          </div>
          <div className='weatherState'>
            <p>{date.main ? `${date.weather[0].main}` : ""}</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p>{date.main ? `${date.main.feels_like} °C` : "0°C"}</p>
            <p>Feels like</p>
          </div>
          <div className='wind'>
            <p>{date.wind ? `${(date.wind.speed * 3.6).toFixed(1)} KM/H` : "N/A"}</p>
            <p>Wind Speed</p>
          </div>
          <div className='humidity'>
          <p>{date.main ? `${date.main.humidity}%` : "0%"}</p>
          <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
