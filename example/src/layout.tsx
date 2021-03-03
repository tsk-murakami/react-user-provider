import React from 'react'

import { useUserContext } from 'react-user-provider'

interface IUser {
  name: string;
}

const Layout: React.FC = () => {
  const { isLoading, isAuthenticated, user, setUserInfos, logout } = useUserContext<IUser>();
  if( isLoading ) {
    return <div>Loadng...</div>
  };
  if( !isAuthenticated ) {

    /**
     * This is just a sample login container.
     */
    const login = async ( authInfos: any ) => {
        const res = await apiResponse(authInfos)
        setUserInfos({ user: res.user })
    };

    return <div>
      Login Form...
      <button onClick={ () => login({}) } >Login</button>
    </div>
  };

  return <div>
    <h1>Hello {user.name}</h1>
    <button onClick={ () => setUserInfos({ user: { name: 'Updated' } }) } >Update userInfos</button>
    <button onClick={ () => logout( () => console.log('logout') ) } >Logout</button>
  </div>
};

export default Layout

async function apiResponse(authInfos={}) {
    return {
      user: { name: 'Relogin' },
      hoge: [ 'fuga' ]
    }
};