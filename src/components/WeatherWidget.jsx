import React, { useState, useEffect } from 'react';
import '../styles/WeatherWidget.css';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  // Mock weather data for different cities
  const mockWeatherData = {
    'Mumbai': {
      city: 'Mumbai',
      temperature: 32,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: 'Today', high: 32, low: 26, condition: 'Sunny' },
        { day: 'Tomorrow', high: 31, low: 25, condition: 'Partly Cloudy' },
        { day: 'Wednesday', high: 30, low: 24, condition: 'Cloudy' },
        { day: 'Thursday', high: 29, low: 23, condition: 'Rainy' },
        { day: 'Friday', high: 31, low: 25, condition: 'Sunny' }
      ]
    },
    'Delhi': {
      city: 'Delhi',
      temperature: 38,
      condition: 'Hot',
      humidity: 45,
      windSpeed: 8,
      forecast: [
        { day: 'Today', high: 38, low: 28, condition: 'Hot' },
        { day: 'Tomorrow', high: 39, low: 29, condition: 'Sunny' },
        { day: 'Wednesday', high: 37, low: 27, condition: 'Partly Cloudy' },
        { day: 'Thursday', high: 36, low: 26, condition: 'Cloudy' },
        { day: 'Friday', high: 38, low: 28, condition: 'Hot' }
      ]
    },
    'Bangalore': {
      city: 'Bangalore',
      temperature: 24,
      condition: 'Pleasant',
      humidity: 70,
      windSpeed: 10,
      forecast: [
        { day: 'Today', high: 24, low: 18, condition: 'Pleasant' },
        { day: 'Tomorrow', high: 25, low: 19, condition: 'Partly Cloudy' },
        { day: 'Wednesday', high: 23, low: 17, condition: 'Cloudy' },
        { day: 'Thursday', high: 22, low: 16, condition: 'Rainy' },
        { day: 'Friday', high: 24, low: 18, condition: 'Pleasant' }
      ]
    },
    'Chennai': {
      city: 'Chennai',
      temperature: 34,
      condition: 'Humid',
      humidity: 80,
      windSpeed: 15,
      forecast: [
        { day: 'Today', high: 34, low: 27, condition: 'Humid' },
        { day: 'Tomorrow', high: 33, low: 26, condition: 'Partly Cloudy' },
        { day: 'Wednesday', high: 32, low: 25, condition: 'Cloudy' },
        { day: 'Thursday', high: 31, low: 24, condition: 'Rainy' },
        { day: 'Friday', high: 33, low: 26, condition: 'Humid' }
      ]
    }
  };

  // Simulate fetching weather data
  useEffect(() => {
    const fetchWeatherData = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      setTimeout(() => {
        try {
          const data = mockWeatherData[selectedCity];
          if (data) {
            setWeatherData(data);
          } else {
            throw new Error('Weather data not available for this city');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, 800);
    };

    fetchWeatherData();
  }, [selectedCity]);

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'hot':
        return '🔥';
      case 'humid':
        return '💦';
      case 'pleasant':
        return '😊';
      default:
        return '🌤️';
    }
  };

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="widget-loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <div className="widget-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="widget-header">
        <h3>Wedding Day Weather Forecast</h3>
        <select value={selectedCity} onChange={handleCityChange} className="city-selector">
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>

      <div className="current-weather">
        <div className="weather-main">
          <div className="weather-icon">
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div className="temperature">
            {weatherData.temperature}°C
          </div>
          <div className="weather-condition">
            {weatherData.condition}
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weatherData.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weatherData.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="weather-forecast">
        <h4>5-Day Forecast</h4>
        <div className="forecast-list">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-icon">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="forecast-temp">
                <span className="high-temp">{day.high}°</span>
                <span className="low-temp">{day.low}°</span>
              </div>
              <div className="forecast-condition">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="weather-advice">
        <h4>Wedding Planning Tips</h4>
        <p>
          {weatherData.temperature > 35 
            ? "It's quite hot! Consider indoor venues or evening ceremonies." 
            : weatherData.humidity > 70 
            ? "High humidity expected. Plan for cooling measures at your venue." 
            : weatherData.condition.toLowerCase().includes('rain') 
            ? "Rain forecasted. Have a backup indoor plan ready." 
            : "Perfect weather for your special day!"}
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;