import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "../configs/routes";
export default function useCurrentPage() {
  const [currentPage, setCurrentPage] = useState({});
  const keys = Object.keys(routes);
  const location = useLocation();

  useEffect(() => {
    const object = keys.reduce((a, b) => {
      a[b] = location.pathname === routes[b].path;
      return { ...a };
    }, {});
    setCurrentPage(object);
  }, [location]);

  return currentPage;
}
