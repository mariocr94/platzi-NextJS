const Pagination = ({
   offset,
   setOffset,
   limit,
}: {
   offset: number;
   setOffset: Function;
   limit: number;
}) => {
   const handlePrev = () => {
      if (offset < limit) return;
      setOffset((offset: number): number => offset - limit);
   };

   const handleNext = () => {
      setOffset((offset: number): number => offset + limit);
   };

   return (
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
         <div className="flex-1 flex justify-between">
            <button
               onClick={handlePrev}
               className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
               Previous
            </button>
            <button
               onClick={handleNext}
               className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default Pagination;
