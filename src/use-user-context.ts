
import { useContext } from "react";

import userContext, { IUserContext } from "./user-context";


export default function useUserContext<UserT,WorkspaceT=any>(){
    return useContext(userContext) as IUserContext<UserT,WorkspaceT>
};