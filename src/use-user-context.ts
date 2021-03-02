
import { useContext } from "react";

import userContext, { NonNullableUserContext } from "./user-context";


export default function useUserContext<UserT,WorkspaceT=any>(){
    return useContext(userContext) as NonNullableUserContext<UserT,WorkspaceT>
};