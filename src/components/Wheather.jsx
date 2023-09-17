import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ForecastBox from "./ForecastBox";
import { useNavigate, useParams } from "react-router-dom";

const Weather = () => {
  const defCity = useSelector(state => state.defaultCity);
  const param = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon, option) => {
      const appid = "&appid=172d95e0ad55cb054eb4ebc27262674e&units=metric";
      const url = "https://api.openweathermap.org/data/2.5/" + option + "?lat=" + lat + "&cnt=6&lon=" + lon + appid;
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

    console.log("param ", param.lat);
    console.log("defCity ", defCity);
    if (param.lat && param.lon) {
      fetchWeather(param.lat, param.lon, "weather");
      fetchWeather(param.lat, param.lon, "forecast");
    } else if (defCity.lat && defCity.lon) {
      console.log("defCity");
      fetchWeather(defCity.lat, defCity.lon, "weather");
      fetchWeather(defCity.lat, defCity.lon, "forecast");
    } else {
      navigate("/");
    }
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
