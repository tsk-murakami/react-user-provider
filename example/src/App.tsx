import React from 'react'

import { UserProvider } from 'react-user-provider';

import Layout from "./layout";

async function reLogin( useError: boolean ){

  /**
   * As like
   * 
   * const refreshToken = localStorage.get('refreshToken')
   * 
   * const res = await fetch( '/api/login-with-token', { 
   * headers: { 
   *  
   * }
   * })
   * 
   */
    await new Promise( resolve => setTimeout( () => resolve(), 3000 ) )
    if( useError ) throw new Error()

    return {
      user: {
        name: useError ? 'Error' : 'Sure'
      }
    }
};

export const App1 = () => {
  return <UserProvider reLogin={ () => reLogin(false) } >
    <h3>Sure relogin</h3>
    <Layout />
  </UserProvider>
}
export const App2 = () => {
  return <UserProvider reLogin={ () => reLogin(true) } >
    <h3>Error relogin</h3>
    <Layout />
  </UserProvider>
}
