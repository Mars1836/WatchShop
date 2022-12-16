import "./App.css";
import Home from "./pages/home/Home";
import Globalstyles from "./components/Globalstyles/Globalstyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Introduce from "./pages/introduce/Intruduce";
import Blog from "./pages/blog/Blog";
import MaleWatches from "./pages/malewatches/MaleWatches";
function App() {
  return (
    <Globalstyles>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/gioi-thieu" element={<Introduce></Introduce>}></Route>
          <Route path="/blog" element={<Blog></Blog>}></Route>
          <Route
            path="/dong-ho-nam"
            element={<MaleWatches></MaleWatches>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Globalstyles>
  );
}

export default App;
