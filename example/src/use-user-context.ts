
import { useContext } from "react";
import { UserContext, NonNullableUserContext } from 'react-user-provider';

interface IUser { name: string; };
interface IWorkspace { };

export function useUserContext(){
    return useContext(UserContext) as NonNullableUserContext<IUser,IWorkspace>;
};