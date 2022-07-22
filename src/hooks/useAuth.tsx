import IUser, { emptyUser } from '@common/models/user';
import endPoints from '@services/api';
import axios from 'axios';
import Cookie from 'js-cookie';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
   user: emptyUser,
   signIn: async (email: string, password: string) => {},
   logout: () => {},
});

const useProvideAuth = (): {
   user: IUser;
   signIn: (email: string, password: string) => Promise<void>;
   logout: () => void;
} => {
   const [user, setUser] = useState<IUser>(emptyUser);

   const signIn = async (email: string, password: string): Promise<void> => {
      const options = {
         headers: { accept: '*/*', 'Content-Type': 'application/json' },
      };
      const { data: accessToken } = await axios.post(
         endPoints.auth.login,
         { email, password },
         options
      );
      if (accessToken) {
         const token = accessToken.access_token;
         Cookie.set('token', token, { expires: 5 });

         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         const { data: user } = await axios.get(endPoints.auth.profile);
         setUser(user);
      }
   };

   const logout = () => {
      Cookie.remove('token');
      setUser(emptyUser);
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/login';
   };

   return {
      user,
      signIn,
      logout,
   };
};

export const ProviderAuth = ({ children }: any) => {
   const auth = useProvideAuth();

   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};
