import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityResultItem = ({ city }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  let navigate = useNavigate();
  const favourites = useSelector(state => state.favourites.content);

  const favString = localStorage.getItem("favourites");
  let favArray = [];

  const jsonFav = JSON.parse(favString);

  if (favString) {
    favArray = jsonFav;
  }
  // const favArray = JSON.parse(favString);

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
      <Col
        xs={1}
        onClick={event => {
          event.stopPropagation();
          favArray.push(city);

          localStorage.setItem("favourites", JSON.stringify(favArray));
          dispatch({ type: "ADD_TO_FAVOURITE", payload: city });
        }}>
        <i className="bi bi-star"></i>
      </Col>
    </Row>
  );
};

export default CityResultItem;
