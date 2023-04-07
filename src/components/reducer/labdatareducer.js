const LabdataReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "SET_API_DATA":
            return {
                ...state,
                isLoading: false,
                LabDatas: action.payload
            };
        case "SET_BLOG_DATA":
            return {
                ...state,
                isLoading: false,
                BlogData: action.payload
            };
        case "SET_PINCODE":
            return {
                ...state,
                isLoading: false,
                PinCodes: action.payload
            }
        case "MOST_BOOKED_PATHOLOGY":
            return {
                ...state,
                isLoading: false,
                MostBookedPathology: action.payload
            }
        case "FAQ_RADIOLOGY":
            return {
                ...state,
                isLoading: false,
                FaqRadiology: action.payload
            }
        case "FAQ_PATHOLOGY":
            return {
                ...state,
                isLoading: false,
                FaqPathology: action.payload
            }
        case "FAQ_SAMPLE":
            return {
                ...state,
                isLoading: false,
                FaqSample: action.payload
            }
        case "MOST_BOOKED_RADIOLOGY":
            return {
                ...state,
                isLoading: false,
                MostBookedRadiology: action.payload
            }
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
};
export default LabdataReducer;