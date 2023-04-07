import { createContext, useContext, useEffect, useReducer } from "react";
import { useLabContext } from "./globalcontext";
import reducer from "../reducer/filterreducer";

const FilterContext = createContext();
const initialState = {
    filterData: [],
    allData: [],
    filters: {
        text: "",
    }
}

export const FilterContextProvider = ({ children }) => {
    const { LabDatas } = useLabContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'LOADFILTERDATA', payload: LabDatas })
    }, [LabDatas])

    useEffect(() => {
        dispatch({ type: "FILTERTEST" })
    }, [state.filters])
    // srch filter values  
    const handlesrchfilter = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch({ type: "SRCHFILTER", payload: { name, value } })
    }

    return (<FilterContext.Provider value={{ ...state, handlesrchfilter }}>
        {children}
    </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}