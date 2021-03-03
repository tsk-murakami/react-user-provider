# react-user-provider

> A simple React Context that holds the authentication information.

## Install

```bash
npm install --save react-user-provider
```

## Requirements
 - React 16.8+

## Usage
### Provider

```tsx
import React from 'react'
import { UserProvider } from 'react-user-provider';

async function reLogin(){
  /** 
   * Your re-auth logic here.
  */
  return {
    user: {
      name: 'Use name'
    }
  }
};

const App = () => {
  return <UserProvider reLogin={ () => reLogin(false) } >
    <Layout />
  </UserProvider>
}

```

### Context

```tsx
import { useUserContext } from 'react-user-provider'

interface IUser {
  name: string;
}

const Layout: React.FC = () => {
  const { isLoading, isAuthenticated, user, setData, logout } = useUserContext<IUser>();
  if( isLoading ) {
    return <div>Loadng...</div>
  };
  if( !isAuthenticated ) {
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
    <h1>Hello {user?.name}</h1>
    <button onClick={ () => setData({ user: { name: 'Updated' } }) } >Update userInfos</button>
    <button onClick={ () => logout( () => console.log('logout') ) } >Logout</button>
  </div>
};
```

### Custom use-context
```ts
import { useContext } from "react";
import { UserContext, NonNullableUserContext } from 'react-user-provider';

interface IUser { };
interface IWorkspace { };

export function useUserContext(){
  // "user" is not undefined 
  return useContext(UserContext) as NonNullableUserContext<IUser,IWorkspace>
};
```

## API

```ts
interface IUserState<UserT=any,WorkSpaceT=any> {
  user?: UserT;
  workspace?: WorkSpaceT;
};
interface IStatus {
  isLoading: boolean;
  isAuthenticated: boolean;
};
type CallbackFunction = () => void | Promise<void>;

interface IActions<UserT=any,WorkSpaceT=any>  {
  logout: ( cb?: CallbackFunction ) => Promise<void>;
  setData: (option: IUserState<UserT,WorkSpaceT> ) => void;
};

interface IUserContext<UserT=any,WorkSpaceT=any> 
  extends IUserState<UserT,WorkSpaceT>, IStatus, IActions<UserT,WorkSpaceT> {};
```

## Paramters

```ts
interface IOptions {
    reLogin(): Promise<IUserState>
};
const UserProvider: React.FC<IOptions> = props => { /** Logic */}
```

## License

MIT © [tsk-murakami](https://github.com/tsk-murakami)
