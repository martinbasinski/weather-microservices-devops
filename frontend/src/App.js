import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempHistory, setTempHistory] = useState([]);

  const getWeatherIcon = (temp) => {
    if (temp > 20) return <WiDaySunny className="weather-icon" />;
    if (temp > 10) return <WiCloudy className="weather-icon" />;
    if (temp > 0) return <WiRain className="weather-icon" />;
    return <WiSnow className="weather-icon" />;
  };

  const chartData = {
    labels: tempHistory.map((_, index) => `${index * 3}h temu`),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: tempHistory,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/weather/${city}`);
      setWeather(response.data);
      // Symulacja historii temperatury (w prawdziwej aplikacji pobieralibyśmy te dane z API)
      setTempHistory([
        response.data.temperature,
        response.data.temperature - 1,
        response.data.temperature - 0.5,
        response.data.temperature - 2,
        response.data.temperature - 1.5
      ]);
      setError(null);
    } catch (err) {
      setError('Nie udało się pobrać danych pogodowych');
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1>Weather App</h1>
        
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Wprowadź nazwę miasta..."
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Ładowanie...' : 'Sprawdź pogodę'}
          </button>
        </form>
        
        {error && <div className="error">{error}</div>}
        
        {weather && (
          <div className="weather-info">
            <h2>{weather.city}, {weather.country}</h2>
            <div className="weather-icon-container">
              {getWeatherIcon(weather.temperature)}
            </div>
            <div className="weather-details">
              <div className="weather-parameter">
                <h3>Temperatura</h3>
                <p>{weather.temperature}°C</p>
              </div>
              <div className="weather-parameter">
                <h3>Prędkość wiatru</h3>
                <p>{weather.windspeed} km/h</p>
              </div>
              <div className="weather-parameter">
                <h3>Ostatnia aktualizacja</h3>
                <p>{new Date(weather.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="chart-container">
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;