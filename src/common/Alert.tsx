import { XCircleIcon } from '@heroicons/react/solid';

const Alert = ({ alert, handleClose }: any) => {
   if (alert && alert?.autoClose) {
      setTimeout(() => {
         handleClose();
      }, 9000);
   }

   return (
      <>
         {alert?.active && (
            <div x-data className="bg-indigo-100 py-2 w-full rounded mb-8">
               <div className="flex space-x-3 px-5">
                  <div className="flex-1 leading-tight text-sm text-black font-medium">
                     {alert.message}
                  </div>
                  <button type="button">
                     <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default Alert;
