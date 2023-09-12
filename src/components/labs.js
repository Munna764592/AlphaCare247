import React, { useState, useEffect } from "react";
import { useFilterContext } from "./context/filtercontext";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useLabContext } from "./context/globalcontext";
import Cookies from 'js-cookie';

const Labs = () => {
    const navigate = useNavigate();
    const { isLoading, LabDatas, OpenLoginFun } = useLabContext();
    const { handlesrchfilter, filters: { text }, filterData, filterlabData, Cookielen, datalabs, sorting, SameTests } = useFilterContext();
    const [srchsuggest, setsrchsuggest] = useState(true);
    const { id } = useParams();

    const [myArray, setMyArray] = useState([]);
    const getCookie = () => {
        if (Cookies.get("tests") !== undefined) {
            setMyArray(JSON.parse(Cookies.get("tests")));

            if (JSON.parse(Cookies.get("tests")).length === 0) {
                navigate("/")
            }
            Cookielen(JSON.parse(Cookies.get("tests")).length)
        } else {
            Cookies.set("tests", JSON.stringify(myArray), {
                expires: 10,
                secure: true,
                sameSite: 'strict',
                path: '/'
            })
        }
    }
    useEffect(() => {
        getCookie();
        if (JSON.parse(Cookies.get("tests")) === undefined) {
            navigate("/")
        }
    }, [])
    const setCookie = (id, name) => {
        setsrchsuggest(true);
        window.newArray = [...myArray, { 'id': id, 'test': name }];
        setMyArray(window.newArray);
        Cookies.set("tests", JSON.stringify(window.newArray), {
            expires: 1,
            secure: true,
            sameSite: 'strict',
            path: '/'
        })
        getCookie();
    }
    const deleteTest = function (id) {
        const cookieData = JSON.parse(Cookies.get("tests"))
        const updatedData = cookieData.filter(item => item.id !== id);
        Cookies.set('tests', JSON.stringify(updatedData));
        getCookie();
    }
    const [hidedetail, sethidedetail] = useState(false);
    const HideShow = (val) => {
        if (val) {
            sethidedetail(false);
        } else if (!val) {
            sethidedetail(true);
        }
    }
    // check login
    const callProfilesection = async () => {
        await axios.get('/loginUser', {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            setLoginUsr(true);
        })
    }
    useEffect(() => {
        callProfilesection();
    }, [])

    const [LoginUsr, setLoginUsr] = useState(false);
    const CheckLogin = () => {
        if (LoginUsr === false) {
            OpenLoginFun(true);
        } else {
            navigate(`/test/paydetails/${id}`)
        }
    }

    if (isLoading) {
        {
            return (
                <>
                    <div style={{ position: "fixed", background: "rgba(0,0,0,0.7)", width: "100%", height: "100vh", zIndex: "99999", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-105px" }}>
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className="container-xxl px-3">
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", fontSize: "17px" }}>
                    <i style={{ color: "#02bdb4", fontSize: "20px", position: "relative", left: "175px", zIndex: "+2" }} className="fa-solid fa-magnifying-glass"></i>
                    <i style={{ color: "#02bdb4", fontSize: "20px", position: "relative", left: "20px" }} className="fa-solid fa-1x fa-location-dot"></i>
                    <input style={{ padding: "8px 20px", fontSize: "15px" }} className="form-control drp-srchbar" type="text"></input>
                    <div style={{ width: "30%", position: "relative" }}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input style={{ padding: "8px 25px", fontSize: "15px" }} className="form-control srch-bar" type="text" name="text" value={text} onChange={(e) => { handlesrchfilter(e); setsrchsuggest(false) }} autoComplete="off" />
                        </form>
                        <div className={srchsuggest ? "d-none srch_suggest" : "srch_suggest"}>
                            {filterData && (filterData.map(res => {
                                return (
                                    <div key={res._id}><span className="listtest" onClick={() => { setCookie(res._id, res.name); setsrchsuggest(true) }} style={{ fontSize: "14px" }}>{res.name}</span>
                                    </div>
                                )
                            }))
                            }
                        </div>
                    </div>

                    <select style={{ padding: "8px 20px", fontSize: "15px" }} className="form-select drp-srchbar2" onClick={sorting}>
                        <option style={{ fontSize: "15px" }} defaultValue>All</option>
                        <option value="pathology">Pathology</option>
                        <option value="radiology">Radiology</option>
                    </select>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <h4 style={{ width: "50%" }} className="text-center">Your Selected Test:
                        <div>
                            {(JSON.parse(Cookies.get("tests")) !== undefined) ? JSON.parse(Cookies.get("tests"))?.map(res => {
                                return (
                                    <span key={res?.id} className="testselect" >{res?.test}<i style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark ml-1" onClick={() => { deleteTest(res?.id) }}></i></span>
                                )
                            }) : navigate("/")}
                        </div>
                    </h4>
                    <div style={{ width: "25%" }}>
                        <h4 style={{ color: "#02bdb4", padding: "7px 20px", background: "#EEEEEE", borderRadius: "6px" }} className="text-center">{id}</h4>
                    </div>
                </div>
            </div >
            <div className="labs-nav">
                <div className="container-xxl d-flex">
                    {datalabs?.filter(val => {
                        if (val.name === id) {
                            return val;
                        }
                    }).map((res, index) => {
                        return (
                            <div key={index} className="mx-2 lab-left p-1" style={{ width: "22%", background: "#f7f7f7", borderRadius: "6px" }}>
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    <img style={{ height: "140px" }} src={res?.img} alt="img" />
                                </div>
                                <div style={{ color: "#ffc107" }} className="d-flex"><h5 style={{ color: "#02bdb4", fontWeight: "600", fontSize: "17px" }}>Lab details</h5><i className="fa-solid fa-circle-info ml-1"></i>
                                </div>
                                <div style={{ fontSize: "14px" }}>
                                    <div><i style={{ color: "red" }} className="fa-solid fa-location-dot mr-1"></i>Delhi, Noida, Gurugram</div>
                                    <div><i style={{ color: "#20c997" }} className="fa-regular fa-circle-check mr-1"></i>{res?.certificate}</div>
                                    <div><i className="fa-solid fa-clock-rotate-left mr-1"></i>Get Reports Within:
                                        <span style={{ color: "black" }}>{res.reportingtime}</span></div>
                                </div>
                                <div className="ff1" style={{ fontWeight: "600", cursor: "pointer", color: "black" }} onClick={() => { HideShow(hidedetail) }}><i className="fa-solid fa-circle fa-2xs"></i> {res.name}<i style={{ marginLeft: "5px" }} className={hidedetail ? "fa-solid fa-caret-down dropdown-rt" : "fa-solid fa-caret-down"}></i></div>
                                <div style={{ fontSize: "14px" }} className={hidedetail ? "mb-1 test-dh" : "mb-1 test-dh test-dl"}>{res.detail}</div>
                            </div>
                        )
                    })}
                    <div style={{ width: "48%" }}>
                        {filterlabData.map((res, index) => {
                            // console.log(filterlabData)
                            return (
                                <div key={index} className="con_about p-1 my-1" style={{ maxHeight: "180px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            <h5>{res.name}</h5>
                                        </div>
                                        <img style={{ width: "40px", height: "30px", marginRight: "90px" }} src={require("../images/31.png")} alt="img" />
                                    </div>
                                    <div className="d-flex">
                                        {(JSON.parse(Cookies.get("tests")) !== undefined) ? JSON.parse(Cookies.get("tests"))?.map((res, index) => {
                                            return (
                                                <div key={index} style={{ width: "80%", fontSize: "16px", fontWeight: "700", marginTop: "26px" }} onClick={() => { deleteTest(res?.id) }}>
                                                    <div style={{ cursor: "pointer", display: "inline-block", position: "relative", zIndex: "+1" }}><i style={{ color: "red" }} className="fa-solid fa-trash-can mr-1" ></i>Remove</div>
                                                </div>
                                            )
                                        }) : navigate("/")}
                                        <div style={{ width: "20%", color: "black" }}>
                                            <div className="strikethrough" style={{ fontWeight: "600" }}>Rs.{2 * Object.values(res.labs).find(get => get.name === id).mrp}/-</div>
                                            <div style={{ fontWeight: "600", fontSize: "20px" }}>Rs.{Object.values(res.labs).find(get => get.name === id).mrp}/-</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="ml-2" style={{ width: "25%", }}>
                        <div className="p-2" style={{ background: "#f7f7f7", borderRadius: "6px", color: "black" }}>
                            <h5 style={{ color: "#02bdb4" }}>Booking Summary</h5>
                            <div className="con_about">
                                {filterlabData.map((res, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between">
                                            <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                                {res.name}
                                            </div>
                                            <div style={{ fontSize: "15px" }}>
                                                <div className="strikethrough" >
                                                    Rs.{2 * Object.values(res.labs).find(get => get.name === id).mrp}/-
                                                </div>
                                                <div>
                                                    Rs.{Object.values(res.labs).find(get => get.name === id).mrp}/-
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {datalabs?.filter(val => {
                                    if (val.name === id) {
                                        return val;
                                    }
                                }).map((res, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="bor_filter py-1">
                                                <div className="d-flex justify-content-between">
                                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                                        M.R.P Total:
                                                    </div>
                                                    <div style={{ fontSize: "15px" }}>
                                                        Rs.{((JSON.parse(Cookies.get("tests")).length > 1)) ? 2 * SameTests.filter(get => get.labCode.toLowerCase() === res.code.toLowerCase())[0]?.testMrp : 2 * res.mrp}/-
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                                        Price Discount:
                                                    </div>
                                                    <div style={{ fontSize: "15px" }}>
                                                        - Rs.{((JSON.parse(Cookies.get("tests")).length > 1)) ? SameTests.filter(get => get.labCode.toLowerCase() === res.code.toLowerCase())[0]?.testMrp : res.mrp}/-
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bor_filter py-1 d-flex justify-content-between">
                                                <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                                    Total Amount:
                                                </div>
                                                <div style={{ fontWeight: "700", fontSize: "15px", color: "#4BB543" }}>
                                                    Rs.{((JSON.parse(Cookies.get("tests")).length > 1)) ? SameTests.filter(get => get.labCode.toLowerCase() === res.code.toLowerCase())[0]?.testMrp : res.mrp}/-
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* <div className="bor_filter py-1 d-flex justify-content-between">
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        Total Savings:
                                    </div>
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        820
                                    </div>
                                </div> */}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button style={{ height: "44px", fontWeight: "700", width: "90%" }} className="btn-lab btn-lab2 mt-2" type='submit' onClick={() => { CheckLogin() }}>SCHEDULE</button>
                            </div>
                        </div>
                        <div className="p-1 mt-1" style={{ background: "#f7f7f7", borderRadius: "6px", color: "black" }}>
                            <h5 style={{ color: "#02bdb4" }}>Recomended Tests</h5>
                            <div className="sOffer">
                                <div> Book Kidney<br /> Function Test<br />
                                    <span style={{ fontSize: "18px" }}>Only Rs.399/-</span>
                                </div>
                                <button style={{ fontSize: "17px", boxShadow: "none", textShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} className="btn-lab from-bottom mt-1">Add to cart<i className="fa-solid fa-circle-plus ml-1"></i></button>
                            </div>
                            <div style={{ background: "#02bdb4" }} className="sOffer sOffer2 mt-2">
                                <div> Book Liver <br /> Function Test<br />
                                    <span style={{ fontSize: "18px" }}>Only Rs.399/-</span>
                                </div>
                                <button style={{ fontSize: "17px", boxShadow: "none", textShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} className="btn-lab btn-lab2 mt-1">Add to cart<i className="fa-solid fa-circle-plus ml-1"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Labs;