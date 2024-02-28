import { createContext, useState } from "react";

export let userContext = createContext(null)

export function UserContextProvider({ children }) {

    let [user, setUser] = useState(null)
    let [login, setLogin] = useState(null)
    let [isOpen,setIsOpen] = useState(false)
    return <userContext.Provider value={{ user, setUser ,login, setLogin,isOpen,setIsOpen}}>
        {children}
    </userContext.Provider>
}