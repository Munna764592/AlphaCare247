import { createContext, useContext, useEffect, useReducer } from "react";
import { useLabContext } from "./globalcontext";
import reducer from "../reducer/filterlabreducer";
import Cookies from 'js-cookie';

const FilterlabContext = createContext();
const initialState = {
    filterlabData: [],
    allDatas: [],
}

export const FilterlabContextProvider = ({ children }) => {
    const { LabDatas } = useLabContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'LOADFILTERLABDATA', payload: LabDatas })
    }, [LabDatas])

    useEffect(() => {
        dispatch({ type: "FILTERLABDATA" })
    }, [state.filterlabData])


    return (<FilterlabContext.Provider value={{ ...state }}>
        {children}
    </FilterlabContext.Provider>
    )
}

export const useFilterlabContext = () => {
    return useContext(FilterlabContext);
}