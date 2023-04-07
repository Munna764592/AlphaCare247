import Cookies from 'js-cookie';
const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOADFILTERDATA":
            return {
                ...state,
                filterData: [...action.payload],
                allData: [...action.payload]
            }

        case "SRCHFILTER":
            const { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters, [name]: value,
                }
            }

        case "FILTERTEST":
            let { allData } = state;
            let tempFiltertest = [...allData];
            const { text } = state.filters;
            if (text) {
                tempFiltertest = tempFiltertest.filter((value) => {
                    if (value?.name?.toLowerCase().includes(text.toLowerCase()) && !JSON.parse(Cookies.get("tests")).some(object => object.id === value._id)) {
                        return value;
                    }
                })
            } else if (text === "") {
                tempFiltertest = []
            }
            return {
                ...state,
                filterData: tempFiltertest,
            }
        default: return state
    }

}
export default filterReducer;