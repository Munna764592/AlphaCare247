import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { useLabContext } from "./context/globalcontext";

const Labs = () => {
    const { isLoading, LabDatas } = useLabContext();
    // Search lab data 
    const { id } = useParams();
    const [filterlabData, setfilterlabData] = useState([]);
    const handlesrchfilter = (event) => {
        const searchWord = event.target.value;
        let datas = LabDatas;
        console.log(datas);
        const newFilter = datas.filter((value) => {
            if (value?.name?.toLowerCase().includes(searchWord.toLowerCase())) {
                return value;
            }
        })
        if (searchWord === "") {
            setfilterlabData([])
        } else {
            setfilterlabData(newFilter);
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
                        <input style={{ padding: "8px 25px", fontSize: "15px" }} className="form-control srch-bar" type="text" onChange={handlesrchfilter}></input>

                        <div className="srch_suggest">
                            {filterlabData && (filterlabData.map((res, key) => {
                                return (
                                    <div key={res._id}><a style={{ fontSize: "14px" }} href="#">{res.name}</a>
                                        {/* <a href="#"> {res.LAB_NAME}</a> */}
                                    </div>
                                )
                            }))
                            }
                        </div>

                    </div>

                    <select style={{ padding: "8px 20px", fontSize: "15px" }} className="form-select drp-srchbar2" aria-label="Default select example">
                        <option style={{ fontSize: "15px" }} defaultValue>All</option>
                        <option value="1">Pathology</option>
                        <option value="2">Radiology</option>

                    </select>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <h4 className="text-center">Your Selected Test:
                        <div>
                            <div style={{ padding: "6px", borderRadius: "200px", fontSize: "15px", border: "1.5px solid #ffc107", color: "#02bdb4", display: "inline-flex", justifyContent: "center", height: "30px", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px" }}>Complete blood count<i style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark ml-1"></i></div>
                        </div>
                    </h4>
                    <h4 style={{ color: "#02bdb4" }} className="text-center">Labcorp Diagnostics Pvt. Ltd.</h4>
                </div>
            </div>
            <div className="labs-nav">
                <div className="container-xxl d-flex">
                    <div className="mx-2 lab-left p-1" style={{ width: "20%", background: "#f7f7f7", borderRadius: "6px" }}>
                        <img src={require("../images/radiology_pathology/kidney.png")} alt="img" />
                        <div className="d-flex justify-content-evenly mt-1">
                            <button style={{ fontSize: "15px" }} className="btn-lab ">Overview</button>
                            <button style={{ fontSize: "15px" }} className="btn-lab ">Lab Details</button>
                        </div>
                        <div style={{ marginTop: "10px", fontSize: "14px" }}>
                            <div><i style={{ color: "red" }} className="fa-solid fa-location-dot mr-1"></i>Delhi, Noida, Gurugram</div>
                            <div><i style={{ color: "#20c997" }} className="fa-regular fa-circle-check mr-1"></i>NABL</div>
                            <div><i className="fa-solid fa-clock-rotate-left mr-1"></i>Get Reports Within:</div>
                            <div><i className="fa-solid fa-check mr-1"></i>Includes: 10 Parameters</div>
                        </div>
                    </div>
                    <div style={{ width: "50%" }}>
                        <div className="con_about p-1" style={{ maxHeight: "180px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <h5>The Pathkind Labs</h5>
                                </div>
                                <img style={{ width: "40px", height: "30px", marginRight: "90px" }} src={require("../images/31.png")} alt="img" />
                            </div>
                            <div className="d-flex">
                                <div style={{ width: "80%", fontSize: "16px", fontWeight: "700" }}>
                                    <div style={{ cursor: "pointer", display: "inline-block", position: "relative", zIndex: "+1" }}><i style={{ color: "red" }} className="fa-solid fa-trash-can mr-1"></i>Remove</div>
                                </div>
                                <div style={{ width: "20%", color: "black" }}>
                                    <div className="strikethrough" style={{ fontWeight: "600" }}>Rs.800/-</div>
                                    <div style={{ fontWeight: "600", fontSize: "20px" }}>Rs.400/-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-2" style={{ width: "25%", }}>
                        <div className="p-2" style={{ background: "#f7f7f7", borderRadius: "6px", color: "black" }}>
                            <h5 style={{ color: "#02bdb4" }}>Booking Summary</h5>
                            <div className="con_about">
                                <div className="d-flex justify-content-between">
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        Complete Blood Count:
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "15px" }}>
                                            Rs.380/-
                                        </div>
                                        <div className="strikethrough" style={{ fontSize: "15px" }}>
                                            Rs.800/-
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        Liver Function Test:
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "15px" }}>
                                            Rs.400/-
                                        </div>
                                        <div className="strikethrough" style={{ fontSize: "15px" }}>
                                            Rs.800/-
                                        </div>
                                    </div>
                                </div>
                                <div className="bor_filter py-1">
                                    <div className="d-flex justify-content-between">
                                        <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                            M.R.P Total:
                                        </div>
                                        <div style={{ fontSize: "15px" }}>
                                            1600
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                            Price Discount:
                                        </div>
                                        <div style={{ fontSize: "15px" }}>
                                            - 820
                                        </div>
                                    </div>
                                </div>
                                <div className="bor_filter py-1 d-flex justify-content-between">
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        Total Amount:
                                    </div>
                                    <div style={{ fontWeight: "700", fontSize: "15px", color: "#4BB543" }}>
                                        780
                                    </div>
                                </div>
                                <div className="bor_filter py-1 d-flex justify-content-between">
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        Total Savings:
                                    </div>
                                    <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                        820
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button style={{ height: "44px", fontWeight: "700", width: "90%" }} className="btn-lab btn-lab2 mt-2" type='submit' name='getotp' >SCHEDULE</button>
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