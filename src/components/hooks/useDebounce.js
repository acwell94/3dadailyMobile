import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const useDebounce = (value, delay, url) => {
  const [successData, setSuccessData] = useState();
  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const handler = setTimeout(async () => {
        try {
          const { data } = await axios.get(`${url}${value}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          setSuccessData(data);
        } catch (err) {
          setSuccessData("");
        }
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    };
    getData();
  }, [value, delay]);
  return successData;
};

export default useDebounce;
