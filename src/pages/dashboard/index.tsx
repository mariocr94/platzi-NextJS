import Chart from '@common/Chart';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { NextPage } from 'next';

const Dashboard: NextPage = () => {
   const products = useFetch(endPoints.products.getAllProducts);

   const categories = products?.map((product) => product.category);
   const categoryNames = categories?.map((category) => category.name);

   const countOcurrences = (arr: any[]) =>
      arr.reduce((prev, curr): any => ((prev[curr] = ++prev[curr] || 1), prev), {});

   const data = {
      datasets: [
         {
            label: 'Categories',
            data: countOcurrences(categoryNames),
            borderWidth: 2,
            backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
         },
      ],
   };

   return (
      <>
         <Chart className="mb-8 mt-2" chartData={data} />
      </>
   );
};

export default Dashboard;
