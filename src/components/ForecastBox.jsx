import { Col } from "react-bootstrap";

const ForecastBox = ({ forecast }) => {
  console.log(forecast);

  let time = new Date(forecast.dt_txt);
  let hour = time.getHours();
  let min = time.getMinutes();
  hour = hour.toString().padStart(2, "0");
  min = min.toString().padStart(2, "0");

  time = hour + ":" + min;

  return (
    <>
      <Col xs={6} md={4} lg={2} className="   ">
        <div className="d-flex flex-column align-items-center bg-secondary text-white shadow-sm bg-gradient  rounded-4  p-3">
          <div>{time}</div>
          <div className="wi-4x">{forecast && <i className={"wi wi-xl wi-owm-" + forecast.weather[0].icon}></i>}</div>
          <div className="my-3">
            <i className="bi bi-thermometer-low me-2">{forecast.main.temp_min}&#176;</i>
            <i className="bi bi-thermometer-high">{forecast.main.temp_max}&#176;</i>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ForecastBox;
