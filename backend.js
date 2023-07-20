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
  const apiURL = process.env.REACT_APP_API_URL;

  // without space it returns hong kong. Didn't see this with any other location. Did not have time to find root cause.
  if (city === "victoria" || city === "Victoria") {
    city = " victoria";
  }
  if (city === undefined && country == undefined) {
    res.json("Waiting for user to make api call");
  } else {
    axios
      .get(`${apiURL}/weather`, {
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
        res.status(500).json(error);
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
