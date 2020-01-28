import { useEffect, useState } from "react";
import axios from "axios";

export const useGet = (url: string) => {
   const [data, setData] = useState([]);

   useEffect(() => {
      axios.get(url).then(res => {
         setData(res.data.results);
      });
   }, [url]);

   return { data };
};
