
import React, { PropsWithChildren } from 'react';
import UserProvider, { IOptions } from "../user-provider";

export const createWrapper = ({ reLogin=simpleReLogin } : Partial<IOptions> ) => 
    ({ children }: PropsWithChildren<{}>): JSX.Element => 
    (
        <UserProvider reLogin={reLogin} >
            {children}
        </UserProvider>
    );

export const simpleReLogin = async () => {
    return { user: { name: "User" } }
};

export const errorRelogin = async () => {
    throw Error("Error")
};