import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import TopBar from "./components/TopBar";
import Weather from "./components/Wheather";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<SearchBox />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
