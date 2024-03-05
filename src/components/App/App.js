import './App.css';
import React, {Component} from "react";
//import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import '../Weather/Weather'
import Weather from '../Weather/Weather';
import {useState} from 'react';
import {setState} from 'react';
import weatherService from '../../repository/weatherRepository';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }


  render() {
    
    const appStyle = {
     
      background: '#f0f0f0', 
      minHeight: '100vh', 
      padding: '20px', 
    };

    return (
      <div style={appStyle}>
        <Weather cities={this.state.cities} fetchData={this.loadCities} />
      </div>
    );
  }

  loadCities = (cityName) => {
    weatherService.fetchCity(cityName)
      .then((data) => {
        this.setState({
          cities: [data.data]
        });
      })
      .catch((error) => {
        console.error("Error loading cities:", error);
      });
  }

  componentDidMount(){
      this.loadCities();
  }

}

// function App() {
//   const [type,setType]=useState('sunny');
//   const [cities,setCities]=useState(
//     [
//       {name:'Skopje',
//       type:'sunny'
//       },
//       {name:'Kicevo',
//       type:'sunny'
//       },
//       {name:'Tetovo',
//       },
//       {name:'Ohrid',
//       },
//     ]
//   )
//   //console.log('We are listing weather forecast!')
//   const showForecast= true;
//   return (
//     <div className="App">

//         {showForecast ? 

//         <>
//         <input type='text' onChange={(e)=>{
//           console.log(e.target.value);
//           setType(e.target.value);
//         }}></input>
//         <div className='flex flex-wrap'>
//             {cities.map((city)=>{
//                 //console.log(city);
//                return( <Weather name={city.name} type={city.type}/>);
//             })}
 
//         </div>
//         </>
//           : 
//           <p>You cannot see forecast</p>
    
//       }
//     </div>
//   );
// }

export default App;
