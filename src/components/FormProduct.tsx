import { joiResolver } from '@hookform/resolvers/joi';
import { addProduct, updateProduct } from '@services/api/product';
import * as Joi from 'joi';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
   title: string;
   price: string;
   categoryId: number;
   description: string;
   images: string[];
};

const imageExtentions = ['image/png', 'image/jpg', 'image/jpeg'];

const ValidationSchema = Joi.object({
   title: Joi.string().min(5).required(),
   price: Joi.number().greater(0).precision(2).required(),
   categoryId: Joi.number().greater(0).precision(2).required(),
   description: Joi.string().required(),
   images: Joi.any()
      .custom(function (file, { error }) {
         if (!file[0]) {
            return error('file.required');
         }

         if (!imageExtentions.includes(file[0].type)) {
            return error('file.invalid');
         }
         return [file[0].name];
      })
      .messages({
         'file.required': 'File is required',
         'file.invalid': 'The file must be one of the following png, jpg or jpeg.',
      }),
});

export default function FormProduct({ setOpen, setAlert, product }: any) {
   const formRef = useRef(null);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>({
      resolver: joiResolver(ValidationSchema),
   });
   const router = useRouter();

   const onSubmit = (data: any) => {
      if (product) {
         updateProduct(product.id, data)
            .then((response) => {
               router.push('/dashboard/products');
            })
            .catch((error) => {
               console.log(error);
            });
      } else {
         addProduct(data)
            .then(() => {
               setAlert({
                  active: true,
                  message: 'Product added successfuly',
                  type: 'success',
                  autoClose: false,
               });
               setOpen(false);
            })
            .catch((error) => {
               setAlert({
                  active: true,
                  message: error.message,
                  type: 'error',
                  autoClose: false,
               });
               setOpen(false);
            });
      }
   };

   useEffect(() => {
      // Se coge la referencia al nodo de HTML del select
      if (Array.isArray(product)) return;
      const titleTag = document.querySelector('#title');
      const priceTag = document.querySelector('#price');
      const categoryTag = document.querySelector('#categoryId');
      const descriptionTag = document.querySelector('#description');
      const imagesTag = document.querySelector('#images');
      // Se cambiar el valor del nodo por el valor del id; eso hace que el valor del <option> cambie tambien
      (titleTag as HTMLInputElement).value = product?.title || '';
      (priceTag as HTMLInputElement).value = product?.price;
      (categoryTag as HTMLSelectElement).value = product?.category?.id || 1;
      (descriptionTag as HTMLInputElement).value = product?.description || '';
      (imagesTag as HTMLInputElement).value = '';
   }, [product]);

   return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
         <div className="overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
               <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                     <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                     </label>
                     <input
                        type="text"
                        id="title"
                        className={`mt-1 
                    focus:ring-indigo-500 
                    focus:border-indigo-500 
                    block w-full shadow-sm 
                    sm:text-sm border-gray-300 
                    rounded-md
                    ${errors.title && 'border-red-300'}`}
                        {...register('title')}
                     />
                     {errors.title && (
                        <span className="text-red-400 font-thin text-sm">
                           {errors.title.message}
                        </span>
                     )}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                     </label>
                     <input
                        type="number"
                        {...register('price')}
                        id="price"
                        className={`mt-1 
                    focus:ring-indigo-500 
                    focus:border-indigo-500 
                    block w-full shadow-sm sm:text-sm 
                    border-gray-300 rounded-md 
                    ${errors.price && 'border-red-300'}`}
                     />
                     {errors.price && (
                        <span className="text-red-400 font-thin text-sm">
                           {errors.price.message}
                        </span>
                     )}
                  </div>
                  <div className="col-span-6">
                     <label
                        htmlFor="categoryId"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Category
                     </label>
                     <select
                        id="categoryId"
                        {...register('categoryId')}
                        autoComplete="category-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     >
                        <option value="1">Clothes</option>
                        <option value="2">Electronics</option>
                        <option value="3">Furniture</option>
                        <option value="4">Toys</option>
                        <option value="5">Others</option>
                     </select>
                  </div>

                  <div className="col-span-6">
                     <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Description
                     </label>
                     <textarea
                        {...register('description')}
                        id="description"
                        autoComplete="description"
                        rows={3}
                        className={`form-textarea
                     mt-1 
                     focus:ring-indigo-500 
                     focus:border-indigo-500 block w-full 
                     shadow-sm sm:text-sm 
                     border-gray-300 rounded-md
                     ${errors.description && 'border-red-300'}`}
                     />
                     {errors.description && (
                        <span className="text-red-400 font-thin text-sm">
                           {errors.description.message}
                        </span>
                     )}
                  </div>
                  <div className="col-span-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">
                           Cover photo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                           <div className="space-y-1 text-center">
                              <svg
                                 className="mx-auto h-12 w-12 text-gray-400"
                                 stroke="currentColor"
                                 fill="none"
                                 viewBox="0 0 48 48"
                                 aria-hidden="true"
                              >
                                 <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                 <label
                                    htmlFor="images"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                 >
                                    <span>Upload a file</span>
                                    <input
                                       defaultValue={product?.images ? product?.images[0] : ''}
                                       id="images"
                                       {...register('images')}
                                       type="file"
                                       className="sr-only"
                                    />
                                 </label>
                                 <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                           </div>
                        </div>
                        {errors.images && (
                           <span className="text-red-400 font-thin text-sm text-center w-full">
                              {errors.images.message}
                           </span>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
               <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                  Save
               </button>
            </div>
         </div>
      </form>
   );
}
