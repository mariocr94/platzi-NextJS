import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
   plugins: {
      title: {
         display: true,
         text: 'Category',
         fontSize: 20,
      },
      legend: {
         display: true,
         position: 'top' as const,
      },
   },
};

const Chart: React.FC<any> = ({ chartData }: { chartData: any }) => {
   return (
      <>
         <Bar data={chartData} options={options} />
      </>
   );
};

export default Chart;
