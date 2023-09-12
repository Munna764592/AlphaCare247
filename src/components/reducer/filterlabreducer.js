import Cookies from 'js-cookie';
const filterlabReducer = (state, action) => {
    switch (action.type) {
        case "LOADFILTERLABDATA":
            return {
                ...state,
                filterlabData: [...action.payload],
                allDatas: [...action.payload]
            }
        case "FILTERLABDATA":
            let { allDatas } = state;
            let tempFilterlabs = [...allDatas];
            if (JSON.parse(Cookies.get("tests")) !== undefined) {
                tempFilterlabs = tempFilterlabs?.filter((value) => {
                    if (JSON.parse(Cookies.get("tests")).some(object => object.id === value._id)) {
                        return value;
                    }
                })
            } else if (JSON.parse(Cookies.get("tests")) === undefined) {
                tempFilterlabs = []
            }
            return {
                ...state,
                filterlabData: tempFilterlabs
            }

        default: return state
    }

}
export default filterlabReducer;