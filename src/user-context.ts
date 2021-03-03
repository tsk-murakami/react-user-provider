
import { createContext } from "react";

export interface IUserState<UserT=any,WorkSpaceT=any> {
    user?: UserT;
    workspace?: WorkSpaceT;
};

export interface IStatus {
    isLoading: boolean;
    isAuthenticated: boolean;
};

export type CallbackFunction = () => void | Promise<void>;

export interface IActions<UserT=any,WorkSpaceT=any>  {
    logout: ( cb?: CallbackFunction ) => Promise<void>;
    setData: (option: IUserState<UserT,WorkSpaceT> ) => void;
};

export interface IUserContext<UserT=any,WorkSpaceT=any> 
    extends IUserState<UserT,WorkSpaceT>, IStatus, IActions<UserT,WorkSpaceT> {};


type UserContextKeys = keyof IUserContext<any,any>;

export type NonNullableUserContext<UserT,WorkSpaceT> = {
	[K in UserContextKeys]: NonNullable<IUserContext<UserT,WorkSpaceT>[K]>;
};

const stub = (): never => {
    throw new Error('You forgot to wrap your component in <UserProvider>.');
};

const initialContext: IUserContext & IActions = { 
    isAuthenticated: false,
    isLoading: true,
    logout: stub,
    setData: stub,
};

const userContext = createContext(initialContext)

export default userContext;
