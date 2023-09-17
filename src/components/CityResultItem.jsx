import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityResultItem = ({ city }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const defCity = useSelector(state => state.defaultCity);

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

  const isDefault = city => {
    if (defCity.lat === city.lat && defCity.lon === city.lon) {
      return true;
    } else {
      return false;
    }
  };

  const setDefault = (event, city) => {
    event.stopPropagation();
    dispatch({ type: "SET_DEF_CITY", payload: { lat: city.lat, lon: city.lon } });
    localStorage.setItem("defaultCity", JSON.stringify(city));
    if (!isFavourite(city)) {
      addCity(event, city);
    }
  };

  const remDefault = () => {
    dispatch({ type: "REMOVE_DEF_CITY" });
    localStorage.removeItem("defaultCity");
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
    if (isDefault(city)) {
      remDefault();
    }
  };

  return (
    <Row
      className=""
      onClick={() => {
        // dispatch({ type: "SET_CITY", payload: { lat: city.lat, lon: city.lon } });
        navigate("weather/" + city.lat + "/" + city.lon);
      }}>
      <Col>{city.name}</Col>
      <Col xs={4}>{city.state}</Col>
      <Col xs={2}>{city.country}</Col>
      <Col xs={1} onClick={event => setDefault(event, city)}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{isDefault(city) ? "unset default" : "set as default"}</Tooltip>}>
          {isDefault(city) ? <i className="bi bi-check-square"></i> : <i className="bi bi-square"></i>}
        </OverlayTrigger>
      </Col>
      <Col xs={1} onClick={isFavourite(city) ? event => remCity(event, city) : event => addCity(event, city)}>
        {isFavourite(city) ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
      </Col>
    </Row>
  );
};

export default CityResultItem;
