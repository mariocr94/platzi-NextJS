import endPoints from '@services/api';
import axios from 'axios';

const addProduct = async (body: any) => {
   const config = {
      headers: {
         accept: '*/*',
         'Content-Type': 'application/json',
      },
   };
   const response = await axios.post(endPoints.products.postProducts, body, config);
   return response.data;
};

const updateProduct = async (id: string, body: any) => {
   const config = {
      headers: {
         accept: '*/*',
         'Content-Type': 'application/json',
      },
   };

   const response = await axios.put(endPoints.products.putProducts(id), body, config);
   return response.data;
};

const deleteProduct = async (id: string) => {
   const response = await axios.delete(endPoints.products.deleteProducts(id));
   return response.data;
};

export { addProduct, deleteProduct, updateProduct };
