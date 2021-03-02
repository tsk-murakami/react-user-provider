
import React, { useState, useCallback, useEffect } from "react";
import UserContext, { IUserState, IStatus } from "./user-context";

export interface IOptions {
    reLogin(): Promise<IUserState>
};

const UserProvider: React.FC<IOptions> = props => {
    const { reLogin, children } = props;

    const [ user, setUserInfos ] = useState<any>();
    const [ workspace, setWorkspace ] = useState<any>();

    const [ status, setStatus ] = useState<IStatus>( { isAuthenticated: false, isLoading: true } )

    const handleChange = useCallback( ( { user, workspace }: IUserState ) => {
        if( user ) setUserInfos(user);
        if( workspace ) setWorkspace(workspace)
    }, [] )

    const logout = useCallback( async (cb?: () => Promise<void>) => {
        setUserInfos(undefined);
        setWorkspace(undefined);
        if( cb ) await cb()
    }, [] )

    const loginWithToken = useCallback ( async () => {
        try{
            const res = await reLogin();
            handleChange(res)
            setStatus({ isAuthenticated: true, isLoading: false })
        }catch(e){
            setStatus({ isAuthenticated: false, isLoading: false })
        };
    }, [reLogin, handleChange] )

    useEffect( () => {
        loginWithToken()
    }, [ loginWithToken ] )

    return <UserContext.Provider 
        value={{
            ...status,
            user: user,
            workspace: workspace,
            setUserInfos: handleChange,
            logout: logout
        }}
    >
        { children }
    </UserContext.Provider>
};

export default UserProvider;
