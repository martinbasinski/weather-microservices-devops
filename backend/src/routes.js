const express = require('express');
const router = express.Router();
const axios = require('axios');

// Funkcja do geokodowania (zamiana nazwy miasta na koordynaty)
async function getCoordinates(city) {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    
    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0];
      return {
        lat: location.latitude,
        lon: location.longitude,
        name: location.name,
        country: location.country
      };
    }
    throw new Error('City not found');
  } catch (error) {
    throw new Error('Geocoding failed');
  }
}

// Get weather data for a city
router.get('/weather/:city', async (req, res) => {
  try {
    // Get coordinates for the city
    const coords = await getCoordinates(req.params.city);
    
    // Get weather data
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
    );

    const weatherData = {
      city: coords.name,
      country: coords.country,
      temperature: weatherResponse.data.current_weather.temperature,
      windspeed: weatherResponse.data.current_weather.windspeed,
      timestamp: new Date().toISOString()
    };

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;