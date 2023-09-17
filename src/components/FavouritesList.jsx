import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import CityResultItem from "./CityResultItem";

const FavouritesList = () => {
  const favourites = useSelector(state => state.favourites.content);
  return (
    <>
      <Container className="bg-secondary bg-gradient shadow text-white my-5 rounded-4 p-3">
        <h5>Favoutrites</h5>
        <ListGroup>
          {favourites.map((elm, i) => (
            <ListGroupItem key={i} className="bg-light">
              <CityResultItem city={elm} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default FavouritesList;
