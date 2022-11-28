import "./App.css";
import Home from "./pages/home/Home";
import Globalstyles from "./components/Globalstyles/Globalstyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Introduce from "./pages/introduce/Intruduce";
function App() {
  return (
    <Globalstyles>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/gioi-thieu" element={<Introduce></Introduce>}></Route>
        </Routes>
      </BrowserRouter>
    </Globalstyles>
  );
}

export default App;
