import React, { useState, useEffect } from "react";
import { useFilterContext } from "./context/filtercontext";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useLabContext } from "./context/globalcontext";
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddressForm = ({ setIsOpen1, callAddPatient }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const notify3 = () => toast.success("ADDRESS ADDED!!");
    const onSubmit = async (data) => {
        await axios.post('/addAddress', {
            addresstype: data.addresstype,
            city: data.city,
            fbsaddress: data.fbsaddress,
            locality: data.locality,
            landmark: data.landmark,
            pincode: data.pincode,
            state: data.state
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            notify3();
            setIsOpen1(false);
            callAddPatient();
        })
    }
    return (
        <>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between">
                    <div style={{ width: "45%" }}>
                        <input style={{ fontSize: "13px" }} type="text" name="fbsaddress" className="InpPatient" placeholder="Flat Number, Building Name, Street*" required {...register("fbsaddress", {
                            minLength: {
                                value: 5, message: "Please enter more details!"
                            }
                        })} />
                        {errors?.fbsaddress && (<div className="err-paydetail">
                            {errors?.fbsaddress.message}
                        </div>)}
                    </div>
                    <div style={{ width: "45%" }}>
                        <input type="number" name="pincode" className="InpPatient" placeholder="Pincode*" required {...register("pincode", {
                            minLength: {
                                value: 6, message: "Please enter valid pincode!"
                            }
                        })} />
                        {errors?.pincode && (<div className="err-paydetail">
                            {errors?.pincode.message}
                        </div>)}
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-1">
                    <div style={{ width: "45%" }}>
                        <input type="text" name="locality" className="InpPatient" placeholder="Locality*" required {...register("locality", {
                            minLength: {
                                value: 3, message: "Please enter valid locality!"
                            }
                        })} />
                        {errors?.locality && (<div className="err-paydetail">
                            {errors?.locality.message}
                        </div>)}
                    </div>
                    <div style={{ width: "45%" }}>
                        <input type="text" name="landmark" className="InpPatient" placeholder="Landmark" {...register("landmark", {
                            minLength: {
                                value: 3, message: "Please enter valid landmark!"
                            }
                        })} />
                        {errors?.landmark && (<div className="err-paydetail">
                            {errors?.landmark.message}
                        </div>)}
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-1">
                    <div style={{ width: "45%" }}>
                        <input type="text" name="city" className="InpPatient" placeholder="City*" required {...register("city", {
                            minLength: {
                                value: 3, message: "Please enter valid city!"
                            }
                        })} />
                        {errors?.city && (<div className="err-paydetail">
                            {errors?.city.message}
                        </div>)}
                    </div>
                    <div style={{ width: "45%" }}>
                        <input type="text" name="state" className="InpPatient" placeholder="State*" required {...register("state", {
                            minLength: {
                                value: 3, message: "Please enter valid state!"
                            }
                        })} />
                        {errors?.state && (<div className="err-paydetail">
                            {errors?.state.message}
                        </div>)}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between mt-2">
                    <div style={{ width: "100%" }} className="d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="addresstype" id="flexRa" value="Home" {...register("addresstype", { required: true })} />
                            <label className="form-check-label" htmlFor="flexRa">
                                Home
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="addresstype" id="flexRad" value="Office" {...register("addresstype", { required: true })} />
                            <label className="form-check-label ml-2" htmlFor="flexRad">
                                Office
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="addresstype" id="flexRadioD" value="Other" {...register("addresstype", { required: true })} />
                            <label className="form-check-label ml-2" htmlFor="flexRadioD">
                                Other
                            </label>
                        </div>
                    </div>
                    {errors?.addresstype && (<div className="err-paydetail text-center">
                        Please select a address type!
                    </div>)}
                </div>
                <div className="my-2 d-flex justify-content-center align-content-center">
                    <button className="btn-pay btn-paySave" type="submit">Save</button>
                    <button type="reset" className="btn-pay ml-3" onClick={() => { setIsOpen1(false) }}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default function CostumerPage() {
    const navigate = useNavigate();

    // modal dialog box
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen1, setIsOpen1] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: "10px 20px",
            transform: 'translate(-50%, -50%)',
            zIndex: "+444",
            width: "40%"
        },
    };
    Modal.setAppElement('#root');
    const { isLoading, CheckLogin, UserData, callAddPatient, OpenLoginFun } = useLabContext();
    const { handlesrchfilter, filters: { text }, filterData, filterlabData, Cookielen, datalabs, sorting, SameTests } = useFilterContext();
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
            navigate("/home");
        }
    }, [])

    useEffect(() => {
        if (!CheckLogin) {
            navigate("/home");
        }
    }, [CheckLogin])

    const [hidedetail, sethidedetail] = useState(false);
    const HideShow = (val) => {
        if (val) {
            sethidedetail(false);
        } else if (!val) {
            sethidedetail(true);
        }
    }
    // add patient modal box  
    const { register, handleSubmit, formState: { errors } } = useForm();

    const notify2 = () => toast.success("PATIENT ADDED!!");
    const onSubmit = async (data) => {
        await axios.post('/addPatient', {
            patientname: data.patientname,
            patientMno: data.patientMno,
            patientage: data.patientage,
            patientrelation: data.patientrelation,
            gender: data.gender
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            notify2();
            setIsOpen(false);
            callAddPatient();
        })
    }

    // check login
    // const notify1 = () => toast.error("PLEASE LOGIN FIRST!!");

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
            <div style={{ position: "relative" }}>
                <div className="container-xxl px-2">
                    <div className="d-flex justify-content-end mt-4">
                        <div className="d-flex justify-content-end" style={{ width: "100%" }}>
                            <h4 style={{ color: "#02bdb4", padding: "7px 20px", background: "#EEEEEE", borderRadius: "6px", width: "25%" }} className="text-center">{id}</h4>
                        </div>
                    </div>
                </div>
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
                            <div className="con_about">
                                <div className="ff1" style={{ fontSize: "18px", fontWeight: "700", color: "black" }}>ADD PATIENT <i className="fa-solid fa-hospital-user ml-1"></i></div>
                                <div className="mt-1">
                                    {UserData.patients?.map((res, index) => {
                                        return (
                                            <span key={index} className="apdetail justify-content-between">
                                                <div style={{ fontSize: "13px" }}>
                                                    {res.patientname}, {res.patientrelation}, {res.gender}, {res.patientage} yrs.
                                                </div>
                                                <div style={{ width: "25px", height: "20px", position: "relative" }}>
                                                    <input style={{ left: "0px", margin: "0px" }} className="form-check-input" type="radio" name="address" value="selectedP" />
                                                </div>
                                            </span>
                                        )
                                    })
                                    }
                                </div>
                                <div className="d-flex my-1 mx-1">
                                    <button className="btn-cdetail" onClick={openModal}>Add patient</button>
                                </div>
                            </div>
                            <div className="con_about mt-1">
                                <div className="ff1" style={{ fontSize: "18px", fontWeight: "700", color: "black" }}>SELECT ADDRESS <i className="fa-solid fa-address-book ml-1"></i></div>
                                <div className="mt-1">
                                    {UserData.patientsaddress?.map((res, index) => {
                                        return (
                                            <span key={index} className="apdetail justify-content-between">
                                                <div style={{ fontSize: "13px" }}>
                                                    {res?.fbsaddress}, {res?.locality}, {res?.landmark}, {res?.city}, {res?.state}, {res?.pincode}, {res?.addresstype}
                                                </div>
                                                <div style={{ width: "25px", height: "20px", position: "relative" }}>
                                                    <input style={{ left: "0px", margin: "0px" }} className="form-check-input" type="radio" name="address" value="selectedP" />
                                                </div>
                                            </span>
                                        )
                                    })
                                    }
                                </div>
                                <div className="d-flex my-1 mx-1">
                                    <button className="btn-cdetail" onClick={() => { setIsOpen1(true) }}>Add more address</button>
                                </div>
                            </div>
                            {filterlabData.some(res =>
                                res.type === "pathology"
                            ) ?
                                <div className="con_about mt-1">
                                    <div className="ff1" style={{ fontSize: "18px", fontWeight: "700", color: "black" }}>CHOOSE DATA & TIME FOR HOME SAMPLE COLLECTION <i className="fa-regular fa-calendar ml-1"></i></div>
                                    <div className="d-flex my-2">
                                        <input className="btn-cdetail" name="collectionDate" type="date" />
                                        <input className="ml-1 btn-cdetail" name="collectionTime" type="time" />
                                    </div>
                                </div>
                                : <div className="con_about mt-1">
                                    <div className="ff1" style={{ fontSize: "18px", fontWeight: "700", color: "black" }}>CHOOSE DATA & TIME OF LAB VISIT <i className="fa-solid fa-calendar-days ml-1"></i></div>
                                    <div className="d-flex my-2">
                                        <input className="btn-cdetail" name="collectionDate" type="date" />
                                        <input className="ml-1 btn-cdetail" name="collectionTime" type="time" />
                                    </div>
                                </div>}
                            <div className="con_about mt-1">
                                <div className="ff1" style={{ fontSize: "18px", fontWeight: "700", color: "black" }}>PAYMENT OPTION <i className="fa-solid fa-credit-card ml-1"></i></div>
                                <div className="d-flex my-2">
                                    <button className="btn-cdetail">UPI</button>
                                    <button className="btn-cdetail ml-1">Cash/UPI at Center</button>
                                    <button className="btn-cdetail ml-1">CARDS</button>
                                </div>
                            </div>
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
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button style={{ height: "44px", fontWeight: "700", width: "90%" }} className="btn-lab btn-lab2 mt-2" type='submit' onClick={() => { if (!CheckLogin) { OpenLoginFun() } }}>BOOK</button>
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
                {/* add patient modal   */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    id="modalAddress" shouldCloseOnOverlayClick={false}>
                    <div style={{ cursor: "pointer", marginTop: "-5px", width: "22px", position: "absolute", right: "5px" }} onClick={closeModal}><i className="fa-regular fa-circle-xmark"></i></div>
                    <h4 className="ff1 text-center mt-2">Add New Patient</h4>
                    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex justify-content-between">
                            <div style={{ width: "45%" }}>
                                <div>
                                    <label style={{ fontWeight: "600", color: "black" }} htmlFor="patientname">Name <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <input id="patientname" type="text" name="patientname" className="InpPatient" placeholder="Full Name" autoComplete="off" {...register("patientname", {
                                    minLength: {
                                        value: 3, message: "Please enter at least 3 character!"
                                    }
                                })} required />
                                {errors?.patientname && (<div className="err-paydetail">
                                    {errors?.patientname.message}
                                </div>)}
                            </div>
                            <div style={{ width: "45%" }}>
                                <div>
                                    <label style={{ fontWeight: "600", color: "black" }} htmlFor="patientrelation">Relation </label>
                                </div>
                                <input id="patientrelation" type="text" name="patientrelation" className="InpPatient" placeholder="Select Relation" autoComplete="off" {...register("patientrelation", {
                                    minLength: {
                                        value: 3, message: "Please enter at least 3 character!"
                                    }
                                })} />
                                {errors?.patientrelation && (<div className="err-paydetail">
                                    {errors?.patientrelation.message}
                                </div>)}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <div style={{ width: "45%" }}>
                                <div>
                                    <label style={{ fontWeight: "600", color: "black" }} htmlFor="patientno">Mobile No.</label>
                                </div>
                                <input id="patientno" type="number" autoComplete="off" name="patientMno" className="InpPatient" placeholder="Mobile No." {...register("patientMno", {
                                    maxLength: {
                                        value: 10, message: "Please enter valid 10 digit mobile number!"
                                    },
                                    minLength: {
                                        value: 10, message: "Please enter valid 10 digit mobile number!"
                                    }
                                })} />
                                {errors?.patientMno && (<div className="err-paydetail">
                                    {errors?.patientMno.message}
                                </div>)}
                            </div>
                            <div style={{ width: "45%" }}>
                                <div>
                                    <label style={{ fontWeight: "600", color: "black" }} htmlFor="patientage">Age <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <input id="patientage" type="number" name="patientage" className="InpPatient" placeholder="Age" required {...register("patientage", {
                                    maxLength: {
                                        value: 3, message: "Please enter valid age!"
                                    }
                                })} />
                                {errors?.patientage && (<div className="err-paydetail">
                                    {errors?.patientage.message}
                                </div>)}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            {/* <div style={{ width: "45%" }}>
                                <div>
                                    <label style={{ fontWeight: "600", color: "black" }} htmlFor="patientdate">Date of Birth <span style={{ fontSize: "12px", color: "grey" }}>(DD-MM-YYYY)</span> <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <input id="patientdate" type="date" name="patientdob" className="InpPatient" placeholder="Date of Birth" required {...register("patientdob")} />
                            </div> */}
                            <div style={{ width: "45%" }}>
                                <div>
                                    <label style={{ fontWeight: "600", color: "black" }} htmlFor="flexRadioDefault1">Gender <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <div className="d-flex">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="Male" {...register("gender", { required: true })} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="Female" {...register("gender", { required: true })} />
                                        <label className="form-check-label ml-1" htmlFor="flexRadioDefault2">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                {errors?.gender && (<div className="err-paydetail text-center">
                                    Please select a gender!
                                </div>)}
                            </div>
                        </div>
                        <div className="my-2 d-flex justify-content-center align-content-center">
                            <button type="submit" className="btn-pay btn-paySave">Save</button>
                            <button type="reset" className="btn-pay ml-3" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                {/* add address modal   */}
                <Modal
                    isOpen={modalIsOpen1}
                    onRequestClose={() => { setIsOpen1(false) }}
                    style={customStyles}
                    contentLabel="Example Modal"
                    id="modalAddress" shouldCloseOnOverlayClick={false}
                >
                    <div style={{ cursor: "pointer", marginTop: "-5px", width: "22px", position: "absolute", right: "5px" }} onClick={() => { setIsOpen1(false) }}><i className="fa-regular fa-circle-xmark"></i></div>
                    <h4 className="ff1 text-center mt-2">Address Details</h4>
                    <AddressForm setIsOpen1={setIsOpen1} callAddPatient={callAddPatient} />
                </Modal>
            </div>
        </>
    )
}

