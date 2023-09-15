import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Weather = () => {
  const city = useSelector(state => state.city);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const appid = "&appid=172d95e0ad55cb054eb4ebc27262674e&units=metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + city.lat + "&lon=" + city.lon + appid;
      try {
        const response = await fetch(url);
        console.log("resp : " + response.ok);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setWeather(data);
        } else {
          alert("Error fetching results");
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      {weather && (
        <Container className="bg-body-tertiary my-5 rounded-4 p-3">
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
            <div className=" wi-6x">{weather && <i className={"wi wi-xl wi-owm-" + weather.weather[0].icon}></i>}</div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Weather;
