import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import IProduct from '@common/models/product';

const useFetch = (endpoint: string): IProduct[] => {
   const [data, setData] = useState<IProduct[]>([]);
   const fetchData = useCallback(async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
   }, [endpoint]);

   useEffect(() => {
      try {
         fetchData();
      } catch (err) {
         console.log(err);
      }
   }, [endpoint, fetchData]);

   return data;
};

export default useFetch;
