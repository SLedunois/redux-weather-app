import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

  renderWeather({ city, list }) {
    const temps = list.map(weather => weather.main.temp);
    const pressures = list.map(weather => weather.main.pressure);
    const humidities = list.map(weather => weather.main.humidity);
    const { lon, lat } = city.coord;

    return (
      <tr key={city.name}>
        <td>
          <GoogleMap lon={lon} lat={lat}/>
        </td>
        <td>
          <Chart data={temps} color="orange" units="K" />
        </td>
        <td>
          <Chart data={pressures} color="green" units="hPa" />
        </td>
        <td>
          <Chart data={humidities} color="blue" units="%" />
        </td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.weather.map(this.renderWeather)
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather = [] }) {
  return { weather }
}

export default connect(mapStateToProps, null)(WeatherList);