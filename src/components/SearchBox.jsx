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
    <Container className="bg-primary text-white bg-gradient shadow my-5 rounded-4 p-3">
      <Form.Label>Search location</Form.Label>
      <Form.Control
        type="text"
        className="bg-light"
        aria-describedby="City search"
        onChange={e => setFilter(e.target.value)}
      />

      <div className="bg-secondary rounded-bottom-3 mx-1">
        {cityResults.map((elm, i) => (
          <div className="p-2">
            <CityResultItem key={i} city={elm} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SearchBox;
