import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useLabContext } from "./globalcontext";
import reducer from "../reducer/filterreducer";
import Cookies from "js-cookie";

const FilterContext = createContext();
const initialState = {
    filterData: [],
    allData: [],
    filters: {
        text: "",
    },
    filterlabData: [],
}

export const FilterContextProvider = ({ children }) => {
    const { LabDatas } = useLabContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [num, setnum] = useState(0);
    useEffect(() => {
        // console.log(LabDatas)
        JSON.parse(Cookies.get("tests")).filter(res => setnum(num + 1))
        dispatch({ type: 'LOADFILTERDATA', payload: LabDatas })
    }, [LabDatas])

    useEffect(() => {
        dispatch({ type: "FILTERTEST" })
    }, [state.filters])
    useEffect(() => {
        dispatch({ type: "FILTERLABDATA" })
    }, [LabDatas, num])

    // srch filter values  
    const handlesrchfilter = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch({ type: "SRCHFILTER", payload: { name, value } })
    }
    const Cookielen = (length) => {
        setnum(length);
    }

    return (<FilterContext.Provider value={{ ...state, handlesrchfilter, Cookielen }}>
        {children}
    </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}