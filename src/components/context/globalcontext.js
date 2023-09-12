import { createContext, useEffect, useReducer, useContext } from "react";
import axios from 'axios';
import reducer from '../reducer/labdatareducer'

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const initialState = {
        isLoading: false,
        isError: false,
        LabDatas: [],
        BlogData: [],
        PinCodes: [],
        CheckLogin: false,
        UserData: [],
        OpenLogin: false
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const loadLabs = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            axios.get('/loginUser', {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                credentials: "include"
            }).then(res => {
                dispatch({ type: "USERLOGIN", payload: true });
            })
            await axios.get('/labdata', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "SET_API_DATA", payload: res.data })

            })
            await axios.get('/blogdata', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "SET_BLOG_DATA", payload: res.data })
            })
            await axios.get('/pincodes', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "SET_PINCODE", payload: res.data })
            })
            await axios.get('/mostbookedpathology', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "MOST_BOOKED_PATHOLOGY", payload: res.data })
            });
            await axios.get('/faqradiology', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "FAQ_RADIOLOGY", payload: res.data })
            });
            await axios.get('/faqpathology', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "FAQ_PATHOLOGY", payload: res.data })
            });
            await axios.get('/faqsamplequestion', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "FAQ_SAMPLE", payload: res.data })
            });
            await axios.get('/mostbookedradiology', {
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                dispatch({ type: "MOST_BOOKED_RADIOLOGY", payload: res.data })
            });
            axios.get('/loginUser', {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                credentials: "include"
            }).then(res => {
                dispatch({ type: "USERDATA", payload: res.data });
            })
        } catch (err) {
            dispatch({ type: "API_ERROR" });
        }
    }
    useEffect(() => {
        loadLabs();
    }, [])

    function UserLogout(data) {
        dispatch({ type: "USERLOGIN", payload: data })
    }
    function callAddPatient() {
        axios.get('/loginUser', {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            dispatch({ type: "USERDATA", payload: res.data });
        })
    }
    function OpenLoginFun(data) {
        dispatch({ type: "OPENLOGIN", payload: data })
    }

    return (<AppContext.Provider value={{ ...state, UserLogout, callAddPatient, OpenLoginFun }}>{children}</AppContext.Provider>)
}

// custom hooks  
const useLabContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useLabContext };