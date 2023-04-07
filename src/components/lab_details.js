import React, { useState, useEffect } from "react";
import { useLabContext } from "./context/globalcontext";
import { useFilterContext } from "./context/filtercontext";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import Cookies from 'js-cookie';

export default function LabDetails() {
    const navigate = useNavigate();
    const { isLoading, LabDatas } = useLabContext();
    const { handlesrchfilter, filters: { text }, filterData } = useFilterContext();

    const [pageCount, setPageCount] = useState(2);
    function count() {
        // const { name } = LabDatas;
        // console.log(name);
        const filteredData = LabDatas?.filter((filtervalue) => {
            if (JSON.parse(Cookies.get("tests")).some(object => object.id === filtervalue._id)) {
                return filtervalue;
            }
        }).map(res => {
            return Object.values(res.labs).map(val => val)
        })
        // setPageCount(Math.ceil(filteredData.length / 6));
    }
    useEffect(() => {
        count();
    })
    const [keysi, newkeysi] = useState(0);
    const [keys, newkeys] = useState(6);
    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        newkeys(currentPage * 6);
        newkeysi(currentPage * 6 - 6);
    }
    const [myArray, setMyArray] = useState([]);
    const getCookie = () => {
        if (Cookies.get("tests") !== undefined) {
            setMyArray(JSON.parse(Cookies.get("tests")));

            if (JSON.parse(Cookies.get("tests")).length === 0) {
                navigate("/")
            }

        } else {
            Cookies.set("tests", JSON.stringify(myArray), {
                expires: 1,
                secure: true,
                sameSite: 'strict',
                path: '/'
            })
        }
    }
    useEffect(() => {
        getCookie();
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
    const [srchsuggest, setsrchsuggest] = useState(true);
    if (isLoading) {
        {
            return (
                <>
                    <div style={{ position: "fixed", background: "rgba(0,0,0,0.7)", width: "100%", height: "100vh", zIndex: "99999", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-128px" }}>
                        <Audio
                            height="80"
                            width="100%"
                            radius="9"
                            color="#02bdb4"
                            ariaLabel="loading"

                        />
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className="container-xxl">
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
                                    <div key={res.Sno}><span className="listtest" onClick={() => { setCookie(res._id, res.name); setsrchsuggest(true) }} style={{ fontSize: "14px" }} href="#">{res.name}</span>
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
            </div>
            <div style={{ boxSizing: "border-box" }} className="container-xxl mx-4 mt-3 d-flex">
                <div style={{ width: "60%", Height: "400px" }}>
                    <div style={{ minHeight: "900px" }}>
                        <h4 className="text-center">Your Trusted Labs Who Conduct:
                            <div>
                                {JSON.parse(Cookies.get("tests"))?.map(res => {
                                    return (
                                        <span key={res?.id} className="testselect" >{res?.test}<i style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark ml-1" onClick={() => { deleteTest(res?.id) }}></i></span>
                                    )
                                })}
                            </div>
                        </h4>
                        {LabDatas?.filter((filtervalue) => {
                            if (JSON.parse(Cookies.get("tests")).some(object => object.id === filtervalue._id)) {
                                return filtervalue;
                            }
                        }).map(res => {
                            return Object.values(res.labs).slice(keysi, keys).map(val => {
                                // console.log(val)
                                return (
                                    <div key={val.code} className="con_about p-1 my-1 lab-box" style={{ maxHeight: "180px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <Link to={`/test/${val.name}`} style={{ fontSize: "20px", fontWeight: "700", color: "black" }}>{val.name}</Link>
                                                <div style={{ width: "150px", height: "35px", overflow: "hidden", justifyContent: "center", display: "flex", alignItems: "center" }}>
                                                    <img className="ml-1" style={{ width: "180px", height: "110px" }} src={val.img} alt="img" />
                                                </div>
                                            </div>
                                            <img style={{ width: "40px", height: "30px", marginRight: "110px" }} src={require("../images/31.png")} alt="img" />
                                        </div>
                                        <div className="d-flex">
                                            <div style={{ width: "80%", fontSize: "14px" }}>
                                                <div><i style={{ color: "red" }} className="fa-solid fa-location-dot mr-1"></i>Delhi, Noida, Gurugram</div>
                                                <div><i style={{ color: "#20c997" }} className="fa-regular fa-circle-check mr-1"></i>NABL</div>
                                                <div><i className="fa-solid fa-clock-rotate-left mr-1"></i>Get Reports Within: <span style={{ color: "black" }}>{val.reportingtime}</span></div>
                                            </div>
                                            <div style={{ width: "20%", color: "black" }}>
                                                <div className="strikethrough" style={{ fontWeight: "600" }}>Rs.{2 * val.mrp}/-</div>
                                                <div style={{ fontWeight: "600", fontSize: "20px" }}>Rs.{val.mrp}/-</div>
                                                <div className="ml-1 pricetag" style={{ position: "relative" }}>
                                                    <i style={{ color: "#ffc107", transform: "rotate(-45deg)" }} className="fa-solid fa-5x fa-tag"></i><div style={{ position: "absolute", color: "white", fontWeight: "900", fontSize: "25px", left: "23px", top: "25px", lineHeight: "18px" }}>50<div style={{ fontSize: "13px" }}>%off</div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        })
                        }
                    </div>
                    <ReactPaginate breakLabel={'...'} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={'pagination justify-content-center py-1'} pageClassName={'page-item'} pageLinkClassName={'page-link'} previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'} activeClassName={'active'} />

                </div>
                <div className=" mx-4" style={{ width: "30%" }}>
                    <h5 style={{ color: "#02bdb4" }}>We make search easy for you</h5>
                    <div style={{ color: "black" }} className="con_about p-1">
                        <div style={{ color: "#ffc107" }} className="d-flex"><h6 style={{ color: "#02bdb4", fontWeight: "600", fontSize: "17px" }}>Price Filter</h6><i className="fa-solid fa-filter ml-1"></i>
                        </div>
                        <div><input className="sliderd" type="range" id="cowbell" name="cowbell" min="50" max="5000" />
                        </div>
                        <div className="bor_filter">
                            <div style={{ color: "#ffc107" }} className="d-flex mt-1"><h5 style={{ color: "#02bdb4", fontWeight: "600", fontSize: "17px" }}>Lab certification filter</h5><i className="fa-solid fa-filter ml-1"></i>
                            </div>
                            <div style={{ display: "inline-grid", columnGap: "20px", gridTemplateColumns: "150px 150px", fontSize: "14px" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ width: "80px" }}><img style={{ width: "20px", height: "20px", marginRight: "10px" }} src={require("../images/hcplfile/89.png")} alt="img" /><span>NABL</span></div>
                                    <input className="ml-1 checkboxd" type="checkbox" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ width: "80px" }}><img style={{ width: "20px", height: "20px", marginRight: "10px" }} src={require("../images/hcplfile/87.png")} alt="img" /><span>CAP</span></div>
                                    <input className="ml-1 checkboxd" type="checkbox" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ width: "80px" }}><img style={{ width: "20px", height: "20px", marginRight: "10px" }} src={require("../images/hcplfile/90.png")} alt="img" /><span>ISO</span></div>
                                    <input className="ml-1 checkboxd" type="checkbox" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ width: "80px" }}><img style={{ width: "20px", height: "20px", marginRight: "10px" }} src={require("../images/hcplfile/88.png")} alt="img" /><span>ICMR</span></div>
                                    <input className="ml-1 checkboxd" type="checkbox" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ width: "80px" }}><img style={{ width: "20px", height: "20px", marginRight: "10px" }} src={require("../images/hcplfile/91.png")} alt="img" /><span>NABH</span></div>
                                    <input className="ml-1 checkboxd" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 className="mt-1" style={{ color: "#02bdb4" }}>Test prepration</h5>
                    <div style={{ color: "black" }} className="con_about p-1">
                        <div style={{ color: "#ffc107" }} className="d-flex"><h5 style={{ color: "#02bdb4", fontWeight: "600", fontSize: "17px" }}>Test details</h5><i className="fa-solid fa-circle-info ml-1"></i>
                        </div>
                        <div style={{ fontWeight: "700", fontSize: "15px" }}>
                            Complete Blood Count
                        </div>
                        <div style={{ fontSize: "14px" }} className="mb-1">It measures the hemoglobin and all other tests...</div>
                        <div className="bor_filter">
                            <div style={{ color: "#ffc107" }} className="d-flex mt-1"><h5 style={{ color: "#02bdb4", fontWeight: "600", fontSize: "17px" }}>Things you must know</h5><i className="fa-solid fa-circle-exclamation ml-1"></i>
                            </div>
                            <div style={{ fontWeight: "700" }}>
                                <i style={{ color: "#ffc107" }} className="fa-solid fa-droplet mr-1"></i>Sample Type: <span style={{ fontWeight: "500", fontSize: "14px" }}>Blood/Urine</span>
                            </div>
                            <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                <i style={{ color: "#ffc107" }} className="fa-solid fa-circle-check mr-1"></i>Prepration: <span style={{ fontWeight: "500", fontSize: "14px" }}>Fasting must be for 8-10 hours.</span>
                            </div>
                        </div>
                    </div>
                    <h5 className="mt-1" style={{ color: "#02bdb4" }}>Recomended Tests</h5>
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
        </>
    )
}