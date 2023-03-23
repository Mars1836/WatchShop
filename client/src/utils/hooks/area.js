import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
function useArea() {
  const [area, setArea] = useState([]);
  useEffect(() => {
    var Parameter = {
      url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      method: "GET",
      responseType: "application/json",
    };
    var promise = axios(Parameter);
    promise.then(function (result) {
      setArea(JSON.parse(result.data));
    });
  }, []);
  return area;
}
export default useArea;
