import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityResultItem = ({ city }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (added) navigate("weather");
  }, [added, navigate]);

  return (
    <Row
      onClick={() => {
        dispatch({ type: "SET_CITY", payload: { lat: city.lat, lon: city.lon } });
        setAdded(true);
      }}>
      <Col>{city.name}</Col>
      <Col xs={3}>{city.state}</Col>
      <Col xs={3}>country: {city.country}</Col>
      <Col xs={1}>
        <i className="bi bi-star"></i>
      </Col>
    </Row>
  );
};

export default CityResultItem;
