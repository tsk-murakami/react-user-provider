import React from 'react'

import { useUserContext } from 'react-user-provider';
//import { useUserContext as CUseUserContext } from "./use-user-context";

interface IUser {
  name: string;
}

const Layout: React.FC = () => {
  const { isLoading, isAuthenticated, user, setData, logout } = useUserContext<IUser>();
  if( isLoading ) {
    return <div>Loadng...</div>
  };
  if( !isAuthenticated ) {

    /**
     * This is just a sample login container.
     */
    const login = async ( authInfos: any ) => {
        const res = await apiResponse(authInfos)
        setData({ user: res.user })
    };

    return <div>
      Login Form...
      <button onClick={ () => login({}) } >Login</button>
    </div>
  };

  return <div>
    <h1>Hello {user?.name}</h1>
    <button onClick={ () => setData({ user: { name: 'Updated' } }) } >Update userInfos</button>
    <button onClick={ () => logout( () => console.log('logout') ) } >Logout</button>
  </div>
};

export default Layout

/*
const Private: React.FC = () => {
  const { user, setUserInfos, logout } = CUseUserContext()
  return <div>
    <h1>Hello {user.name}</h1>
    <button onClick={ () => setUserInfos({ user: { name: 'Updated' } }) } >Update userInfos</button>
    <button onClick={ () => logout( () => console.log('logout') ) } >Logout</button>
  </div>
}
*/

async function apiResponse(authInfos={}) {
    return {
      user: { name: 'Relogin' },
      hoge: [ 'fuga' ]
    }
};
