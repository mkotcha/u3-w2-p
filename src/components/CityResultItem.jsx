import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityResultItem = ({ city }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const favourites = useSelector(state => state.favourites.content);

  const favString = localStorage.getItem("favourites");
  const favArray = [];

  if (favString) {
    favArray.push(...JSON.parse(favString));
  }

  const isFavourite = city => {
    if (favArray.find(elm => elm.lat === city.lat && elm.lon === city.lon)) {
      return true;
    } else {
      return false;
    }
  };

  const addCity = (event, city) => {
    event.stopPropagation();
    favArray.push(city);
    localStorage.setItem("favourites", JSON.stringify(favArray));
    dispatch({ type: "ADD_TO_FAVOURITES", payload: city });
  };

  const remCity = (event, city) => {
    event.stopPropagation();
    const newArray = favArray.filter(elm => !(elm.lat === city.lat && elm.lon === city.lon));
    console.log(newArray);
    localStorage.setItem("favourites", JSON.stringify(newArray));
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: city });
  };

  return (
    <Row
      onClick={() => {
        dispatch({ type: "SET_CITY", payload: { lat: city.lat, lon: city.lon } });
        navigate("weather");
      }}>
      <Col>{city.name}</Col>
      <Col xs={4}>{city.state}</Col>
      <Col xs={2}>{city.country}</Col>
      <Col xs={1} onClick={isFavourite(city) ? event => remCity(event, city) : event => addCity(event, city)}>
        {isFavourite(city) ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
      </Col>
    </Row>
  );
};

export default CityResultItem;
