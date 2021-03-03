
import { useContext } from "react";

import { renderHook, act } from '@testing-library/react-hooks';
import userContext from "../user-context";

import { createWrapper, errorRelogin, simpleReLogin } from './helpers'

describe('Simple', () => {
  it('isAuthenticated', async () => {
    const wrapper = createWrapper({ reLogin: simpleReLogin })
    const { result, waitForNextUpdate } = renderHook( 
      () => useContext(userContext),
      { wrapper }
      )
    expect( result.current.isLoading ).toEqual(true)
    expect( result.current.isAuthenticated ).toEqual(false)
    await waitForNextUpdate()
    expect( result.current.isAuthenticated ).toEqual(true)
    expect( result.current.isLoading ).toEqual(false)
    const reloginRes = await simpleReLogin()
    expect( result.current.user ).toEqual(reloginRes.user)
  })
  it('set user infos', async () => {
    const wrapper = createWrapper({ reLogin: errorRelogin })
    const { result, waitForNextUpdate } = renderHook( 
      () => useContext(userContext),
      { wrapper }
      )
    await waitForNextUpdate()
    expect( result.current.isAuthenticated ).toEqual(false)
    expect( result.current.isLoading ).toEqual(false)
    const reloginRes = await simpleReLogin()
    act( () => {
      result.current.setData({user: reloginRes.user})
    })
    expect( result.current.user ).toEqual(reloginRes.user)
  })
  it('logout', async () => {
    const wrapper = createWrapper({ reLogin: simpleReLogin })
    const { result, waitForNextUpdate } = renderHook( 
      () => useContext(userContext),
      { wrapper }
      )
    await waitForNextUpdate()
    
    act( () => {
      result.current.logout()
    })
    expect( result.current.user ).toBe( undefined )
  })
  it('logout callback', async () => {
    let loggedin = true
    const wrapper = createWrapper({ reLogin: simpleReLogin })
    const { result, waitForNextUpdate } = renderHook( 
      () => useContext(userContext),
      { wrapper }
      )
    await waitForNextUpdate()
    
    act( () => {
      result.current.logout( () => {
        loggedin = false
      })
    })
    expect( loggedin ).toBe( false )
  })
  it('workspace', async () => {
    const workspace = 'workspace'
    const wrapper = createWrapper({ reLogin: simpleReLogin })
    const { result, waitForNextUpdate } = renderHook( 
      () => useContext(userContext),
      { wrapper }
      )
    await waitForNextUpdate()
    const reloginRes = await simpleReLogin()
    act( () => {
      result.current.setData( { workspace: workspace })
    })
    expect( result.current.workspace ).toBe( workspace )
    expect( result.current.user ).toEqual( reloginRes.user )
  })
})
