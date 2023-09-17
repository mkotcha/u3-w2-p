import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ForecastBox from "./ForecastBox";
import { useParams } from "react-router-dom";

const Weather = () => {
  const city = useSelector(state => state.city);
  const param = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async (city, option) => {
      const appid = "&appid=172d95e0ad55cb054eb4ebc27262674e&units=metric";
      const url =
        "https://api.openweathermap.org/data/2.5/" + option + "?lat=" + city.lat + "&cnt=6&lon=" + city.lon + appid;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (option === "weather") setWeather(data);
          if (option === "forecast") setForecast(data);
        } else {
          alert("Error fetching results");
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    city.lat = param.lat;
    city.lon = param.lon;
    fetchWeather(city, "weather");
    fetchWeather(city, "forecast");
  }, []);

  return (
    <>
      {weather && (
        <Container className="my-5 ">
          <div className="bg-primary bg-gradient shadow  text-white rounded-4 p-3">
            <div className="d-flex">
              <div className="me-auto">
                <h2 className="display-1">{weather.name}</h2>
                <div className="d-flex g-3 align-items-baseline">
                  <h4 className="pe-3">{weather.weather[0].description}</h4>
                  <span>feels like {weather.main.feels_like}&#176;</span>
                </div>
                <span className="pe-3"> t: {weather.main.temp}&#176;</span>
                <span className="pe-3">min: {weather.main.temp_min}&#176;</span>
                <span className="pe-3">max: {weather.main.temp_max}&#176;</span>
              </div>
              <div className=" wi-6x">
                {weather && <i className={"wi wi-xl wi-owm-" + weather.weather[0].icon}></i>}
              </div>
            </div>
          </div>
        </Container>
      )}

      {forecast && (
        <Container>
          <Row className=" g-3">
            {forecast.list.map((elm, i) => (
              <ForecastBox key={i} forecast={elm} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Weather;
