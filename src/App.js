import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0vh;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 20px;
  border-radius: 8px;
  border-width: 0.25px;
  border-color: darkgrey;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  &:hover {
    background-color: lightgray;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin: 4px 0 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
`;

const Cards = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column-reverse;
`;

const Card = styled.div`
  margin-top: 30px;
`;

const Title = styled.h1`
  margin-bottom: 50px;
`;

function App() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);

  const handleClick = () => {
    setLocations([]);
  };

  const handleSubmit = (e) => {
    setCity("");
    setCountry("");
    e.preventDefault();
    fetch(
      `http://localhost:8000/weather?city=${city.trim()}&country=${country.trim()}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == 200) {
          const uniqueLocation = { ...json, id: uuidv4() };
          setLocations([...locations, uniqueLocation]);
        } else {
          toast.error("Please input a valid location");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Container>
      <Title>Current Weather Application</Title>
      <p>Input a location to view the current weather</p>
      <form onSubmit={handleSubmit}>
        <Label>Country:</Label>
        <br />
        <Input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <br />
        <Label>City:</Label>
        <br />
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <br />
        <Button type="submit">Submit</Button>
        <ToastContainer />
      </form>
      <Button onClick={handleClick}>Clear weather listings</Button>
      <Cards>
        {locations.map((location) => (
          <Card key={location.id}>
            <WeatherCard weatherData={location} />
          </Card>
        ))}
      </Cards>
    </Container>
  );
}

export default App;
