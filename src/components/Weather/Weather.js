import React, { useState } from 'react';
import weatherService from '../../repository/weatherRepository';

function Weather(props) {
  const [cityNameInput, setCityNameInput] = useState('');

  const handleInputChange = (event) => {
    setCityNameInput(event.target.value);
  };

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
 
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name"
              value={cityNameInput}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSearch()
                  .then((cityData) => {
                    console.log("City data loaded successfully:", cityData);
                    
                  })
                  .catch((error) => {
                    console.error("Error during city search:", error);
                  });
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
  <div className="col-md-12">
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Temperature</th>
          <th scope="col">Condition</th>
          <th scope="col">Wind Speed</th>
          <th scope="col">Wind Direction</th>
          <th scope="col">Actions</th> {/* New column for the button */}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(props.cities) &&
          props.cities.map((city) => (
            <tr key={city.name}>
              <td>{city.name}</td>
              <td>{city.temp}</td>
              <td>{city.condition}</td>
              <td>{city.wind_speed}</td>
              <td>{city.wind_direction}</td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
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
