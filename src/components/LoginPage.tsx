import { LockClosedIcon } from '@heroicons/react/solid';
import { useAuth } from '@hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function LoginPage() {
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const [error, setError] = useState(false);
   const auth = useAuth();
   const router = useRouter();

   const submitHandle = (event: React.FormEvent) => {
      event.preventDefault();
      const email = emailRef.current?.value || '';
      const password = passwordRef.current?.value || '';
      auth
         .signIn(email, password)
         .then(() => {
            setError(false);
            router.push('/dashboard');
         })
         .catch(() => {
            setError(true);
         });
   };

   return (
      <>
         <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
               <div>
                  <Image
                     src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                     className="mx-auto h-12 w-auto"
                     width={48}
                     height={48}
                     alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                     Sign in to your account
                  </h2>
               </div>
               <form className="mt-8 space-y-6" onSubmit={submitHandle}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                     <div>
                        <label htmlFor="email-address" className="sr-only">
                           Email address
                        </label>
                        <input
                           id="email-address"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Email address"
                           ref={emailRef}
                        />
                     </div>
                     <div>
                        <label htmlFor="password" className="sr-only">
                           Password
                        </label>
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           required
                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Password"
                           ref={passwordRef}
                        />
                     </div>
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <input
                           id="remember-me"
                           name="remember-me"
                           type="checkbox"
                           className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                           Remember me
                        </label>
                     </div>

                     <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                           Forgot your password?
                        </a>
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                           <LockClosedIcon
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              aria-hidden="true"
                           />
                        </span>
                        Sign in
                     </button>
                  </div>
               </form>
               {error && (
                  <div
                     className="flex items-center justify-left text-red-700 text-md border shadow-lg rounded-lg py-2 px-3 bg-red-300"
                     role="alert"
                  >
                     <span className="font-bold">Login Failed!</span>
                     <span> Invalid username and password.</span>
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
