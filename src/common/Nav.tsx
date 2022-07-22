import { useRouter } from 'next/router';

export default function Nav() {
   const router = useRouter();
   const route = router.pathname.substring(1);

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="py-2 border-b border-gray-500">
            <h2 className="text-2xl font-bold text-gray-900 ">{route}</h2>
         </div>
      </div>
   );
}
