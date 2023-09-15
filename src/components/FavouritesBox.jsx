import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import CityResultItem from "./CityResultItem";

const FavouritesBox = () => {
  const favourites = useSelector(state => state.favourites.content);
  return (
    <>
      <Container className="bg-body-tertiary my-5 rounded-4 p-3">
        <h5>Favoutrites</h5>
        <ListGroup>
          {favourites.map((elm, i) => (
            <ListGroupItem>
              <CityResultItem key={i} city={elm} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default FavouritesBox;
