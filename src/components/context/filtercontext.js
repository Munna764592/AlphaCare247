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
    datalabs: [],
    sortValue: 'All',
    SameTests: [],
    MaxPrice: "",
    MinPrice: ""
}

export const FilterContextProvider = ({ children }) => {
    const { LabDatas } = useLabContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [num, setnum] = useState(0);
    useEffect(() => {
        JSON.parse(Cookies.get("tests")).filter(res => setnum(num + 1))
        dispatch({ type: 'LOADFILTERDATA', payload: LabDatas })
    }, [LabDatas])

    // filter tests 
    useEffect(() => {
        dispatch({ type: "FILTERTEST" })
    }, [state.filters, state.sortValue])
    // filter lab data 
    useEffect(() => {
        dispatch({ type: "FILTERLABDATA" })
        dispatch({ type: "PRICEFILTER" })
    }, [LabDatas, num])

    // srch filter values  
    const handlesrchfilter = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch({ type: "SRCHFILTER", payload: { name, value } })
    }

    // get cookie length 
    const Cookielen = (length) => {
        setnum(length);
    }

    // sorting function 
    const sorting = (event) => {
        let selectedType = event.target.value;
        dispatch({ type: "SELECTEDTYPE", payload: selectedType })
    }

    // price filter  
    return (<FilterContext.Provider value={{ ...state, handlesrchfilter, Cookielen, sorting }}>
        {children}
    </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}