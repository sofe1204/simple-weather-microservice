import React, { useState } from 'react';
import weatherService from '../../repository/weatherRepository';

function Weather(props) {
  const [cityNameInput, setCityNameInput] = useState('');

  const handleInputChange = (event) => {
    setCityNameInput(event.target.value);
  };

  // const handleSearch = () => {
  //   // Call a function to fetch data based on the entered city name
  //   props.fetchData(cityNameInput);
  // };
  const handleSearch = () => {
    return new Promise((resolve, reject) => {
      // Call the fetchData function passed as a prop with the entered city name
      props.fetchData(cityNameInput)
        .then((data) => {
          // Update the state to include the new city data
          this.setState((prevState) => ({
            cities: [...prevState.cities, data.data],
          }));
          resolve(data.data); // Resolve the promise with the fetched city data
        })
        .catch((error) => {
          console.error("Error loading cities:", error);
          reject(error); // Reject the promise with the error
        });
    });
  };
  

  
  
  

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={cityNameInput}
            onChange={handleInputChange}
          />
          <button onClick={() => {
            handleSearch()
              .then((cityData) => {
                console.log("City data loaded successfully:", cityData);
                // Do something with the city data if needed
              })
              .catch((error) => {
                console.error("Error during city search:", error);
              });
          }}>
                 Search
</button>

        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th scope={"col"}>Name</th>
                <th scope={"col"}>Temperature</th>
                <th scope={"col"}>Condition</th>
                <th scope={"col"}>Wind Speed</th>
                <th scope={"col"}>Wind Direction</th>
              </tr>
            </thead>
        
            <tbody>
  {Array.isArray(props.cities) && props.cities.map((city) => (
    <tr key={city.name}>
      <td>{city.name}</td>
      <td>{city.temp}</td>
      <td>{city.condition}</td>
       <td>{city.wind_speed}</td>
       <td>{city.wind_direction}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Weather;
