import "./App.css";
import Globalstyles from "./components/Globalstyles/Globalstyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import routes from "./utils/configs/routes";
import Notfound from "./pages/404/Notfound";
function App() {
  const pages = Object.values(routes);
  return (
    <Globalstyles>
      <BrowserRouter>
        <Routes>
          {pages.map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={page.component}
              ></Route>
            );
          })}
          <Route path="*" element={<Notfound />} key="123"></Route>
        </Routes>
      </BrowserRouter>
    </Globalstyles>
  );
}

export default App;
