import { createContext, useContext, useState } from "react";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  
    const [login , setLogin] = useState('false');
    const [allData, setAllData] = useState([]);
    const [userName , setUserName] = useState('');



  
    return (
        <StateContext.Provider value={{
            login , setLogin,
            allData,setAllData,
            userName, setUserName
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)