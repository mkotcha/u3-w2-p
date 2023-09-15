import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import CityResultItem from "./CityResultItem";

const SearchBox = () => {
  const [filter, setFilter] = useState("");
  const [cityResults, setCityResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const appid = "&limit=5&appid=172d95e0ad55cb054eb4ebc27262674e";
      const url = "http://api.openweathermap.org/geo/1.0/direct?q=" + filter + appid;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          setCityResults(data);
        } else {
          alert("Error fetching results");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (filter.length > 2) {
      fetchSearch();
    }
  }, [filter]);

  return (
    <Container>
      <Form.Label>Search</Form.Label>
      <Form.Control type="text" aria-describedby="City search" onChange={e => setFilter(e.target.value)} />
      <Form.Text muted>Search your city</Form.Text>
      {cityResults.map((elm, i) => (
        <CityResultItem key={i} city={elm} />
      ))}
    </Container>
  );
};

export default SearchBox;
