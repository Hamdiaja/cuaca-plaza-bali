import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Ganti dengan API key kamu
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(URL);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Kota tidak ditemukan atau terjadi kesalahan.');
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Cuaca Plaza Bali</h1>
      <p>Cek kondisi cuaca realtime untuk seluruh wilayah di Bali!</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Masukkan nama kota..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Cari Cuaca</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Cuaca Icon"
          />
          <p>Suhu: {weatherData.main.temp}°C</p>
          <p>Cuaca: {weatherData.weather[0].description}</p>
          <p>Kelembapan: {weatherData.main.humidity}%</p>
          <p>Angin: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;