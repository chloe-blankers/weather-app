const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 8000;

app.use(cors());

app.get("/weather", (req, res) => {
  let { city, country } = req.query;
  const apiKey = process.env.REACT_APP_API_KEY;

  // without space it returns hong kong. Didn't see this with any other location. Did not have time to find root cause.
  if (city.toLowerCase() === "victoria") {
    city = " victoria";
  }

  axios
    .get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: `${city},${country}`,
        units: "metric",
        appid: apiKey,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching weather data" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
