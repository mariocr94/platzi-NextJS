import FormProduct from '@components/FormProduct';
import endPoints from '@services/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Edit = () => {
   const [product, setProduct] = useState<any[]>([]);
   const [notFound, setNotFound] = useState(false);
   const [id, setId] = useState('');
   const router = useRouter();

   useEffect(() => {
      const { id } = router.query;
      setId(id as string);
      if (!router.isReady) return;
      const getProduct = async () => {
         try {
            const response = await axios.get(endPoints.products.getProduct(id as string));
            setProduct(response.data);
         } catch (e) {
            console.log(e);
            setNotFound(true);
         }
      };
      getProduct();
   }, [router?.isReady]);

   return (
      <>
         {notFound ? (
            <div className="w-auto bg-red-300 text-red-600 text-lg font-bold px-4 py-2">
               {`Product with id ${id} not found`}
            </div>
         ) : (
            <FormProduct product={product} />
         )}
      </>
   );
};

export default Edit;
