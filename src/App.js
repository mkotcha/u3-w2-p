import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Weather from "./components/Wheather";
import HomePage from "./components/HomePage";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const favourites = useSelector(state => state.favourites.content);
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
