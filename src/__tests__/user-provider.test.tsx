
import { useContext } from "react";

import { renderHook, act } from '@testing-library/react-hooks';
import userContext from "../user-context";

import { createWrapper } from './helpers'

describe('ExampleComponent', () => {
  it('is truthy', async () => {
    const wrapper = createWrapper({})
    const { result, waitForNextUpdate } = renderHook( 
      () => useContext(userContext),
      { wrapper }
      )
    console.log( result.current )
    await waitForNextUpdate()
    console.log( result.current )
    act( () => {
      result.current.setUserInfos({  user: 'fuga' })
    })

    console.log(result)
    //await waitForNextUpdate()
    expect(true)
  })
})
