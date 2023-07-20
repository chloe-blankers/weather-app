import React from "react";
import { Card } from "semantic-ui-react";
import icon_2xx from "../icons/icon_2xx.svg";
import icon_3xx from "../icons/icon_3xx.svg";
import icon_5xx from "../icons/icon_5xx.svg";
import icon_6xx from "../icons/icon_6xx.svg";
import icon_7xx from "../icons/icon_7xx.svg";
import icon_800 from "../icons/icon_800.svg";
import icon_80x from "../icons/icon_80x.svg";
import styled from "styled-components";

const Icon = styled.img`
  width: 60px;
  margin-left: 100px;
`;

const getIcon = (id) => {
  const intId = parseInt(id);
  if (intId > 800) {
    return icon_80x;
  } else if (intId === 800) {
    return icon_800;
  } else if (intId >= 700) {
    return icon_7xx;
  } else if (intId >= 600) {
    return icon_6xx;
  } else if (intId >= 500) {
    return icon_5xx;
  } else if (intId >= 300) {
    return icon_3xx;
  } else {
    return icon_2xx;
  }
};

const WeatherCard = ({ weatherData }) => {
  const icon = getIcon(weatherData.weather[0].id);
  return (
    <Card>
      <Card.Content>
        <Card.Header className="header">{`Current Weather in ${weatherData.name}`}</Card.Header>
        <Icon src={icon} alt="Icon" />
        <br />
        <p>Description: {weatherData.weather[0].description}</p>
        <p>Temprature: {weatherData.main.temp} &deg;C</p>
        <p>Feels like: {weatherData.main.feels_like} &deg;C</p>
        <p>Wind: {weatherData.wind.speed} km/hour</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
      </Card.Content>
    </Card>
  );
};

export default WeatherCard;
