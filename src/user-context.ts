
import { createContext } from "react";

export interface IUserState<UserT=any,WorkSpaceT=any> {
    user?: UserT;
    workspace?: WorkSpaceT;
};

export interface IStatus {
    isLoading: boolean;
    isAuthenticated: boolean;
};

export interface IActions {
    logout: ( cb?: () => Promise<void> ) => Promise<void>;
    setUserInfos: (option: Partial<IUserState> ) => void;
};

export interface IUserContext<UserT=any,WorkSpaceT=any> 
    extends IUserState<UserT,WorkSpaceT>, IStatus, IActions {};

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
    setUserInfos: stub,
};

const userContext = createContext(initialContext)

export default userContext;
