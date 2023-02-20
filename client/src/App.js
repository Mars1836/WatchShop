import "./App.css";
import Globalstyles from "./components/Globalstyles/Globalstyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "./utils/configs/routes";
import store from "./redux/store";
import { Provider } from "react-redux";
import VerifyToken from "./services/VerifyToken";
import Notfound from "./pages/404/Notfound";

function App() {
  const pages = Object.values(routes);

  return (
    <Provider store={store}>
      <VerifyToken>
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
      </VerifyToken>
    </Provider>
  );
}

export default App;
