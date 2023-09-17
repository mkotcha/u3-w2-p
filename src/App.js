import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Weather from "./components/Wheather";
import HomePage from "./components/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const favourites = useSelector(state => state.favourites.content);
  const dispatch = useDispatch();

  useEffect(() => {}, [favourites]);

  useEffect(() => {
    const favString = localStorage.getItem("favourites");
    const favArray = [];
    if (favString) {
      favArray.push(...JSON.parse(favString));
    }

    if (favourites.length === 0 && favArray.length > 0) {
      // favArray.map(city => dispatch({ type: "ADD_TO_FAVOURITE", payload: city }));
      dispatch({ type: "SET_FAVOURITES", payload: [...favArray] });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather/:lat/:lon" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
