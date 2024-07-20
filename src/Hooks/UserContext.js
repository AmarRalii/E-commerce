import { createContext, useState } from "react";

export let UserContext =  createContext();

export default function UserContextProvider(props){
    const [userToken , setUserToken] = useState(null)
    const [isOpen , setIsOpen] = useState(null)
    return <UserContext.Provider value={{userToken , setUserToken,isOpen,setIsOpen}}>
        {props.children}
    </UserContext.Provider>
}