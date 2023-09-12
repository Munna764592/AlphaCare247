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
        case "SELECTEDTYPE":
            return {
                ...state,
                sortValue: action.payload
            }
        case "FILTERTEST":
            let tempFiltertest = [...state.allData];
            const { text } = state.filters;
            let selectedval = state.sortValue;

            if (selectedval === "pathology" || selectedval === "radiology") {
                tempFiltertest = tempFiltertest.filter(val => {
                    if (val.type === selectedval) {
                        return val;
                    }
                })
            }
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
        case "FILTERLABDATA":
            let datalabs = [];
            let SameTests = [];
            let tempFilterlabs = [...state.allData];
            if (JSON.parse(Cookies.get("tests")) !== undefined) {
                tempFilterlabs = tempFilterlabs.filter((value) => {
                    if (JSON.parse(Cookies.get("tests")).some(object => object.id === value._id)) {
                        return value;
                    }
                })

                if (JSON.parse(Cookies.get("tests")).length > 1) {
                    tempFilterlabs.map(res => Object.values(res.labs).map(a => { if (a.code !== undefined) datalabs.push(a) }));
                    const counts = datalabs.reduce((acc, item) => {
                        acc[item.code.toLowerCase()] = acc[item.code.toLowerCase()] ? acc[item.code.toLowerCase()] + 1 : 1;
                        return acc;
                    }, {});

                    const maxCount = Math.max(...Object.values(counts));
                    if (maxCount > 1 && maxCount === JSON.parse(Cookies.get("tests")).length) {
                        window.result = datalabs.filter(item => counts[item.code.toLowerCase()] === maxCount).reduce((acc, curr) => {
                            const index = acc.findIndex(item => item.code.toLowerCase() === curr.code.toLowerCase());

                            if (index === -1) {
                                acc.push(curr);
                            } else {
                                if (SameTests.some(get => get.labCode === acc[index].code)) {
                                    SameTests.forEach(obj => {
                                        if (obj.labCode === acc[index].code) {
                                            obj.testMrp += curr.mrp;
                                        }
                                    })
                                } else {
                                    SameTests.push({ labCode: acc[index].code, testMrp: curr.mrp + acc[index].mrp })
                                }
                            }
                            return acc;
                        }, []);
                    } else {
                        window.result = undefined;
                    }
                } else if (JSON.parse(Cookies.get("tests")).length === 1) {
                    tempFilterlabs.map(res => Object.values(res.labs).map(a => { if (a.code !== undefined) datalabs.push(a) }));
                    window.result = datalabs;
                }
                window.sameTests = SameTests;

            } else if (JSON.parse(Cookies.get("tests")) === undefined) {
                tempFilterlabs = []
            }
            return {
                ...state,
                filterlabData: tempFilterlabs,
                datalabs: window.result,
                SameTests: SameTests
            }
        case "PRICEFILTER":
            let maxPrice = 0, minPrice = Number.MAX_SAFE_INTEGER;
            if (JSON.parse(Cookies.get("tests")).length === 1) {
                maxPrice = window.result?.reduce((max, test) => {
                    return test.mrp > max ? test.mrp : max;
                }, 0);

                minPrice = window.result?.reduce((min, test) => {
                    return test.mrp < min ? test.mrp : min;
                }, Number.MAX_SAFE_INTEGER);
            } else if (JSON.parse(Cookies.get("tests")).length > 1) {
                maxPrice = window.sameTests?.reduce((max, test) => {
                    return test.testMrp > max ? test.testMrp : max;
                }, 0);

                minPrice = window.sameTests?.reduce((min, test) => {
                    return test.testMrp < min ? test.testMrp : min;
                }, Number.MAX_SAFE_INTEGER);
            }
            return {
                ...state,
                MaxPrice: maxPrice,
                MinPrice: minPrice
            }
        default: return state
    }
}
export default filterReducer;