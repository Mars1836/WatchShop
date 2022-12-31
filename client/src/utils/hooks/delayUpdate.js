import { useEffect, useRef, useState } from "react";
export default function useDelayUpdate(value, time = 300) {
  const [delayValue, setDelayValue] = useState("");
  let delayId = useRef();
  useEffect(() => {
    delayId.current = setTimeout(() => {
      setDelayValue(value);
    }, time);
    return () => {
      clearTimeout(delayId.current);
    };
  }, [value, time]);
  return delayValue;
}
